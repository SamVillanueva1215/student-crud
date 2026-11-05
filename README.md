# Student CRUD System

Full-stack Student Management System built with a Spring Boot REST API and a Vite + React + Tailwind CSS frontend.

## Project Structure

- `student/` - Spring Boot Backend API (PostgreSQL + Spring Data JPA)
- `frontend/` - React (Vite) + Tailwind CSS Frontend (No Modals, Split-View Layout)

## Running the Application

### 1. Backend (Spring Boot)
Ensure PostgreSQL is running and database `db_student` is created.
```powershell
cd student
.\mvnw.cmd spring-boot:run
```
Backend runs at `http://localhost:8080`.

### 2. Frontend (React + Vite)
```powershell
cd frontend
npm install
npm run dev
```
Frontend runs at `http://localhost:5173`.
