# Marketplace QA Project

## Overview
This project simulates a real-world marketplace application used for QA practice.

It includes a fullstack architecture with frontend, backend, and database integration.

## Tech Stack
- Frontend: React (Vite)
- Backend: Node.js + Express
- Database: PostgreSQL (Docker)
- ORM: Prisma

## Features
- Product listing
- Product API
- Database persistence
- Error handling (product not found)

## QA Focus
This project was built to practice:

- API validation
- Data consistency across layers
- End-to-end testing (Cypress - planned)
- CI/CD pipeline simulation (planned)

## Architecture

Frontend → API → Backend → Database

## How to Run

### Backend
cd backend
npm install
docker-compose up -d
npx prisma migrate dev
npx ts-node prisma/seed.ts
npm run dev

### Frontend
cd frontend
npm install
npm run dev

## Future Improvements
# Marketplace QA Project

## Overview
This project simulates a real-world marketplace application used for QA practice.

It includes a fullstack architecture with frontend, backend, and database integration.

## Tech Stack
- Frontend: React (Vite)
- Backend: Node.js + Express
- Database: PostgreSQL (Docker)
- ORM: Prisma

## Features
- Product listing
- Product API
- Database persistence
- Error handling (product not found)

## QA Focus
This project was built to practice:

- API validation
- Data consistency across layers
- End-to-end testing (Cypress - planned)
- CI/CD pipeline simulation (planned)

## Architecture

Frontend → API → Backend → Database

## How to Run

### Backend
cd backend
npm install
docker-compose up -d
npx prisma migrate dev
npx ts-node prisma/seed.ts
npm run dev

### Frontend
cd frontend
npm install
npm run dev

## Future Improvements
- Cypress E2E tests
- CI/CD pipeline with GitHub Actions
- Test coverage reports
- Cypress E2E tests
- CI/CD pipeline with GitHub Actions
- Test coverage reports
