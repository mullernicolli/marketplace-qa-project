# Marketplace Backend

Express + Prisma + PostgreSQL

## Quick Start

```bash
# 1. Start PostgreSQL
docker compose up -d

# 2. Install dependencies
npm install

# 3. Generate Prisma client & run migrations
npx prisma generate
npx prisma migrate dev --name init

# 4. Seed the database
npx prisma db seed

# 5. Start the server
npm run dev
```

Server runs at `http://localhost:3001`.

## Test Credentials

- **alice@example.com** / password123
- **bob@example.com** / password123

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /api/login | No | Returns JWT token |
| GET | /api/products | No | List all products |
| GET | /api/products/:id | No | Single product |
| POST | /api/cart/add | Yes | Add item to cart |
| GET | /api/cart | Yes | View cart |
| POST | /api/checkout | Yes | Place order, decrements stock |

## Environment Variables

Copy `.env` and adjust as needed:

```
DATABASE_URL="postgresql://marketplace:marketplace123@localhost:5432/marketplace"
JWT_SECRET="super-secret-key-change-in-production"
PORT=3001
```

## Frontend

Set `VITE_API_URL=http://localhost:3001/api` in the Lovable frontend project.
