import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Seed users
  const hashedPassword = await bcrypt.hash("password123", 10);
  await prisma.user.create({
    data: { id: 1, email: "alice@example.com", password: hashedPassword },
  });
  await prisma.user.create({
    data: { id: 2, email: "bob@example.com", password: hashedPassword },
  });

  // Seed products
  const products = [
    { id: 1, name: "Wireless Headphones", price: 79.99, stock: 15, category: "Electronics" },
    { id: 2, name: "Running Shoes", price: 129.99, stock: 8, category: "Sports" },
    { id: 3, name: "Coffee Maker", price: 49.99, stock: 20, category: "Home" },
    { id: 4, name: "Backpack", price: 59.99, stock: 12, category: "Accessories" },
    { id: 5, name: "Desk Lamp", price: 34.99, stock: 25, category: "Home" },
    { id: 6, name: "Yoga Mat", price: 24.99, stock: 30, category: "Sports" },
    { id: 7, name: "Bluetooth Speaker", price: 39.99, stock: 18, category: "Electronics" },
    { id: 8, name: "Water Bottle", price: 14.99, stock: 50, category: "Accessories" },
  ];

  for (const p of products) {
    await prisma.product.create({ data: p });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
