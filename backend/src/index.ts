import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";

app.use(cors());
app.use(express.json());

// --- Auth middleware ---
function authenticate(req: express.Request, res: express.Response, next: express.NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const payload = jwt.verify(header.slice(7), JWT_SECRET) as { userId: number };
    (req as any).userId = payload.userId;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// --- POST /api/login ---
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "24h" });
    res.json({ token });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// --- GET /api/products ---
app.get("/api/products", async (_req, res) => {
  try {
    const products = await prisma.product.findMany({ orderBy: { id: "asc" } });
    res.json(products);
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
});

// --- GET /api/products/:id ---
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await prisma.product.findUnique({ where: { id: Number(req.params.id) } });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
});

// --- POST /api/cart/add ---
app.post("/api/cart/add", authenticate, async (req: any, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity || quantity < 1) {
      return res.status(400).json({ message: "Valid productId and quantity required" });
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (product.stock < quantity) {
      return res.status(400).json({ message: `Only ${product.stock} items in stock` });
    }

    // Find or create cart
    let cart = await prisma.cart.findFirst({
      where: { userId: req.userId },
      include: { items: { include: { product: true } } },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: req.userId },
        include: { items: { include: { product: true } } },
      });
    }

    // Check total quantity in cart + new
    const existing = cart.items.find((i) => i.productId === productId);
    const totalQty = (existing?.quantity || 0) + quantity;
    if (totalQty > product.stock) {
      return res.status(400).json({ message: `Cannot exceed stock. Available: ${product.stock - (existing?.quantity || 0)}` });
    }

    // Upsert cart item
    if (existing) {
      await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: totalQty },
      });
    } else {
      await prisma.cartItem.create({
        data: { cartId: cart.id, productId, quantity },
      });
    }

    // Return updated cart
    const updated = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: { items: { include: { product: true } } },
    });
    res.json(updated);
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
});

// --- GET /api/cart ---
app.get("/api/cart", authenticate, async (req: any, res) => {
  try {
    let cart = await prisma.cart.findFirst({
      where: { userId: req.userId },
      include: { items: { include: { product: true } } },
    });
    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: req.userId },
        include: { items: { include: { product: true } } },
      });
    }
    res.json(cart);
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
});

// --- POST /api/checkout ---
app.post("/api/checkout", authenticate, async (req: any, res) => {
  try {
    const cart = await prisma.cart.findFirst({
      where: { userId: req.userId },
      include: { items: { include: { product: true } } },
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Validate stock for all items
    for (const item of cart.items) {
      if (item.quantity > item.product.stock) {
        return res.status(400).json({
          message: `Insufficient stock for ${item.product.name}. Available: ${item.product.stock}`,
        });
      }
    }

    // Atomic transaction: decrease stock, create order, clear cart
    const total = cart.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

    const order = await prisma.$transaction(async (tx) => {
      for (const item of cart.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      const order = await tx.order.create({
        data: {
          userId: req.userId,
          total: Math.round(total * 100) / 100,
          status: "completed",
        },
      });

      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

      return order;
    });

    res.json(order);
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
