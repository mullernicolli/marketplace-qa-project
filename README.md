# Marketplace QA Project

## Overview

This project simulates a real-world marketplace application used for QA practice.

It includes a fullstack architecture with frontend, backend, and database integration, focusing on validating real application behavior under different conditions.

---

## Objective

Practice Quality Assurance concepts in a realistic environment, including:

* Functional testing
* API validation
* State handling (loading, success, error)
* End-to-end testing (planned)

---

## Tech Stack

* Frontend: React (Vite)
* Backend: Node.js + Express
* Database: PostgreSQL (Docker)
* ORM: Prisma

---

## Features

* Product listing
* Integration with real API
* Database persistence
* Error handling:

  * API offline
  * Product not found
* Retry mechanism for failed requests

---

## QA Focus

This project was built to practice:

* API validation
* Data consistency across layers
* Error handling and fallback behavior
* UI state transitions
* End-to-end testing (Cypress - planned)
* CI/CD pipeline simulation (planned)

---

## Test Scenarios (BDD)

Test scenarios are written using Gherkin:

Location:
tests/test-cases/marketplace.feature

Covered scenarios:

* Product listing success
* API failure (no response / 500)
* Error handling in UI
* Retry after failure
* Retry failure again
* Multiple retry clicks (concurrency edge case)

---

## UI States Covered

The frontend handles different states:

* Loading → displays loading indicator
* Success → displays product list
* Error → displays error message and retry button

---

## QA Considerations

* API failure simulation (500 errors)
* Retry flow validation
* State transition consistency
* Prevention of multiple concurrent requests
* Edge case handling (multiple clicks, API instability)

---

## Architecture

Frontend → API → Backend → Database

---

## How to Run

### Backend

cd backend
npm install
docker-compose up -d
npx prisma migrate dev
npx ts-node prisma/seed.ts
npm run dev

Access:

http://localhost:3001


---

### Frontend

cd frontend
npm install
npm run dev

Access:

http://localhost:5173

---

Ensure ports 3001 (backend) and 5173 (frontend) are available in your environment.

---

## Database

* PostgreSQL running via Docker
* Managed with Prisma ORM

Main entities:

* Product
* Cart
* Order

---

## Future Improvements

* Cypress E2E tests
* API mocking and intercept testing
* CI/CD pipeline with GitHub Actions
* Test coverage reports
* UI improvements

---

## Author

Project developed for QA learning and portfolio building.
