# 🎯 JobTracker — Job Application Tracker

A full-stack web application to track job applications through different hiring stages. Built as an internship submission project.

---

## Project Overview

JobTracker lets you manage every job application in one place. Add applications, update their status as you move through interviews, filter by stage, search by company or title, and delete ones that are no longer relevant — all through a clean, responsive UI.

---

## Tech Stack

| Layer     | Technology                   |
| --------- | ---------------------------- |
| Frontend  | React 18, TypeScript, Axios  |
| Backend   | NestJS (Node.js), TypeScript |
| Database  | PostgreSQL 16                |
| ORM       | TypeORM (with migrations)    |
| API style | REST                         |
| Container | Docker & docker-compose      |

---

## Features

- **Application List** — view all applications with company, title, type, status, and applied date
- **Add Application** — form with validation for all fields
- **Edit Application** — update any field with optimistic UI updates
- **Delete Application** — confirmation step before removing
- **Filter by Status** — Applied / Interviewing / Offer / Rejected
- **Search** — search across company name and job title
- **Pagination** — 10 results per page
- **Loading states & error messages** throughout
- **Unit tests** — 11 tests covering all service methods

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher
- [PostgreSQL](https://www.postgresql.org/) 14+ (or use Docker)
- [Docker](https://www.docker.com/) (optional, for Docker setup)

---

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd job-tracker
```

### 2. Set up environment variables

```bash
# Root level (for docker-compose)
cp .env.example .env

# Backend
cp backend/.env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env
```

Edit `backend/.env` with your PostgreSQL credentials:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=job_tracker
PORT=3001
```

---

## Running in Development Mode

### Option A — Manual (without Docker)

**Step 1: Start PostgreSQL**

Make sure PostgreSQL is running and create the database:

```sql
CREATE DATABASE job_tracker;
```

**Step 2: Start the backend**

```bash
cd backend
npm install
npm run start:dev
```

The backend will start on `http://localhost:3001`.  
TypeORM `synchronize: true` is enabled in dev — it will auto-create the table.

**Step 3: Start the frontend**

```bash
cd frontend
npm install
npm start
```

The frontend will open at `http://localhost:3000`.

---

### Option B — Docker Compose (recommended)

```bash
# From the project root
docker compose up --build
```

This starts:

- PostgreSQL on port `5432`
- NestJS backend on `http://localhost:3001`
- React frontend on `http://localhost:3000`

To stop:

```bash
docker compose down
```

To stop and remove data volumes:

```bash
docker compose down -v
```

---

## Running Tests

```bash
cd backend
npm test
```

To run with coverage:

```bash
npm run test:cov
```

**Test output (11 tests):**

```
PASS src/applications/applications.service.spec.ts
  ApplicationsService
    ✓ should be defined
    findAll
      ✓ returns paginated results with no filters
      ✓ passes status filter to the repository
      ✓ searches across company_name and job_title
    findOne
      ✓ returns a single application by id
      ✓ throws NotFoundException when application does not exist
    create
      ✓ creates and saves a new application
    update
      ✓ updates an existing application
      ✓ throws NotFoundException when updating a non-existent application
    remove
      ✓ removes an existing application
      ✓ throws NotFoundException when deleting a non-existent application

Tests: 11 passed, 11 total
```

---

## Database Migrations

Migrations are in `backend/migrations/`. For production use (instead of `synchronize: true`):

```bash
cd backend

# Run all pending migrations
npm run migration:run

# Revert the last migration
npm run migration:revert
```

---

## Required Environment Variables

### Backend (`backend/.env`)

| Variable      | Description                | Default       |
| ------------- | -------------------------- | ------------- |
| `DB_HOST`     | PostgreSQL host            | `localhost`   |
| `DB_PORT`     | PostgreSQL port            | `5432`        |
| `DB_USERNAME` | PostgreSQL username        | `postgres`    |
| `DB_PASSWORD` | PostgreSQL password        | `postgres`    |
| `DB_NAME`     | PostgreSQL database name   | `job_tracker` |
| `PORT`        | Port for the NestJS server | `3001`        |

### Frontend (`frontend/.env`)

| Variable            | Description          | Default                 |
| ------------------- | -------------------- | ----------------------- |
| `REACT_APP_API_URL` | Backend API base URL | `http://localhost:3001` |

---

## API Documentation

Base URL: `http://localhost:3001`

### Endpoints

#### GET `/applications`

List all applications. Supports filtering and pagination.

**Query parameters:**

| Param    | Type   | Description                                                      |
| -------- | ------ | ---------------------------------------------------------------- |
| `status` | string | Filter by status: `Applied`, `Interviewing`, `Offer`, `Rejected` |
| `search` | string | Search by company name or job title                              |
| `page`   | number | Page number (default: `1`)                                       |
| `limit`  | number | Results per page (default: `10`)                                 |

**Response:**

```json
{
  "data": [ { ...application } ],
  "total": 25,
  "page": 1,
  "limit": 10,
  "totalPages": 3
}
```

---

#### GET `/applications/:id`

Get a single application by ID.

**Response:** `200 OK` — Application object  
**Error:** `404 Not Found`

---

#### POST `/applications`

Create a new application.

**Request body:**

```json
{
  "company_name": "Google",
  "job_title": "Software Engineer",
  "job_type": "Full-time",
  "status": "Applied",
  "applied_date": "2024-06-01",
  "notes": "Referred by a friend"
}
```

**Validation rules:**

- `company_name` — required, minimum 2 characters
- `job_title` — required
- `job_type` — one of `Internship`, `Full-time`, `Part-time`
- `status` — one of `Applied`, `Interviewing`, `Offer`, `Rejected`
- `applied_date` — required, valid ISO date string
- `notes` — optional

**Response:** `201 Created` — Created application object  
**Error:** `400 Bad Request` with validation messages

---

#### PATCH `/applications/:id`

Partially update an application. Send only the fields to update.

**Request body:** any subset of POST body fields

**Response:** `200 OK` — Updated application object  
**Error:** `404 Not Found`, `400 Bad Request`

---

#### DELETE `/applications/:id`

Delete an application permanently.

**Response:** `204 No Content`  
**Error:** `404 Not Found`

---

### Application Data Model

```typescript
{
  id: number; // Auto-generated integer
  company_name: string; // Required, min 2 chars
  job_title: string; // Required
  job_type: "Internship" | // Enum
    "Full-time" |
    "Part-time";
  status: "Applied" | // Enum, default: Applied
    "Interviewing" |
    "Offer" |
    "Rejected";
  applied_date: string; // ISO date, e.g. "2024-06-01"
  notes: string | null; // Optional
  created_at: string; // Auto-set timestamp
  updated_at: string; // Auto-updated timestamp
}
```

## Notes for Reviewer

- `synchronize: true` is used in development for convenience. For production, set it to `false` and use `npm run migration:run`.
- Optimistic UI updates are implemented on edit and delete — the UI updates immediately and rolls back on error.
- CORS is configured to allow `localhost:3000` and `localhost:3001` in development.
