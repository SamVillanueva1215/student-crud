# Project Context & Handoff Guide

This file contains the complete technical context for the **Student CRUD System** so you (or another AI assistant) can immediately pick up where you left off on another computer.

---

## 📌 Repository Information

* **GitHub Repository**: [https://github.com/SamVillanueva1215/student-crud](https://github.com/SamVillanueva1215/student-crud)
* **Default Branch**: `main`
* **GitHub User**: `SamVillanueva1215` (Email: `ssvillanueva.student@ua.edu.ph`)

---

## 🏗️ Architecture Overview

The project is a full-stack CRUD application composed of:

```text
student-crud/
├── render.yaml                      # Render Blueprint (Backend + Frontend + PostgreSQL)
├── CONTEXT.md                       # Complete project context (this file)
├── README.md                        # Project documentation
│
├── student/                         # Backend (Spring Boot REST API)
│   ├── Dockerfile                   # Java 21 multi-stage Docker build for Render
│   ├── .dockerignore                # Excludes target/ and IDE files
│   ├── pom.xml                      # Maven dependencies (Java 21, Spring Boot 4.x)
│   └── src/
│       ├── main/java/com/villanueva/student/
│       │   ├── StudentApplication.java  # Spring Boot entrypoint
│       │   ├── Student.java             # Entity (id, firstname, lastname, course, section)
│       │   ├── StudentRepository.java   # CrudRepository<Student, Integer>
│       │   └── StudentController.java   # REST Controller (@CrossOrigin + /villanueva/students)
│       └── main/resources/
│           └── application.properties   # Dynamic DB configuration (Local + Render)
│
└── frontend/                        # Frontend (Vite + React + Tailwind CSS)
    ├── vite.config.js               # Dev server & reverse proxy to localhost:8080
    ├── package.json                 # Dependencies (React 19, Tailwind v4, Axios, Lucide)
    └── src/
        ├── index.css                # Tailwind CSS v4 import
        ├── main.jsx                 # App root
        ├── App.jsx                  # Main dashboard state coordinator
        ├── services/
        │   └── studentApi.js        # Axios client (reads VITE_API_BASE_URL)
        └── components/
            ├── Navbar.jsx           # Top navbar with count and refresh trigger
            ├── AlertBanner.jsx      # Feedback banner for success/error
            ├── StudentForm.jsx      # On-page inline form (NO MODAL: Add/Edit modes)
            ├── StudentTable.jsx     # Responsive data table with search filter
            └── StudentRow.jsx       # Row with INLINE delete confirmation (No modal)
```

---

## 🗄️ Backend Details (`student/`)

* **Technology**: Java 21, Spring Boot 4.1.1, Spring Data JPA, PostgreSQL Driver.
* **Controller Path**: `/villanueva/students`
* **CORS**: Configured with `@CrossOrigin(origins = "*")` in `StudentController.java`.
* **Database**: PostgreSQL (database name: `db_student`).
* **Endpoints**:
  * `GET /villanueva/students` - Retrieve all students.
  * `GET /villanueva/students/{id}` - Retrieve a student by ID.
  * `POST /villanueva/students` - Create student (JSON: `firstname`, `lastname`, `course`, `section`).
  * `PUT /villanueva/students/{id}` - Update student details.
  * `DELETE /villanueva/students/{id}` - Delete student by ID.
* **Environment Variables (Render vs Local)**:
  `student/src/main/resources/application.properties` supports both:
  * Local defaults: `localhost:5432`, DB: `db_student`, User: `postgres`, Pass: `admin`, SSL: `disable`.
  * Production: Reads `${DB_HOST}`, `${DB_PORT}`, `${DB_NAME}`, `${DATABASE_USERNAME}`, `${DATABASE_PASSWORD}`, and `${PORT}`.

---

## 🎨 Frontend Details (`frontend/`)

* **Technology**: Vite 8, React 19, Tailwind CSS v4, `axios`, `lucide-react`.
* **Design Guideline**: **STRICTLY NO MODALS**.
  * Creating & editing is handled in the left on-page form card (`StudentForm.jsx`).
  * Deleting is handled via an inline safety confirmation in the table row (`"Delete? [Yes] [No]"`).
* **Vite Proxy**: In local development, `vite.config.js` proxies `/villanueva` to `http://localhost:8080` (zero CORS issues locally).
* **Production API Base**: `studentApi.js` checks `import.meta.env.VITE_API_BASE_URL` before falling back to `/villanueva/students`.

---

## ☁️ Deployment on Render.com (`render.yaml`)

A Blueprint file is ready in the root directory:
1. `student-db`: Free tier PostgreSQL database (`db_student`).
2. `student-backend`: Web service using Docker (`student/Dockerfile`) connected to `student-db`.
3. `student-frontend`: Static site running `cd frontend && npm install && npm run build`, publishing `frontend/dist`.

---

## 💻 How to Resume on a New Computer

### Step 1: Clone the Repository
```bash
git clone https://github.com/SamVillanueva1215/student-crud.git
cd student-crud
```

### Step 2: Database Setup (PostgreSQL)
Make sure PostgreSQL is installed and running, then create the database:
```sql
CREATE DATABASE db_student;
```
*(If your local PostgreSQL credentials differ from `postgres`/`admin`, update `student/src/main/resources/application.properties` or set environment variables).*

### Step 3: Run Backend
```bash
cd student
./mvnw spring-boot:run      # On Linux/macOS
.\mvnw.cmd spring-boot:run  # On Windows
```
Runs at `http://localhost:8080`.

### Step 4: Run Frontend
In a second terminal:
```bash
cd frontend
npm install
npm run dev
```
Runs at `http://localhost:5173`.

---

## 🤖 Instructions for AI Assistants (Antigravity / Copilot / Claude)
When resuming this conversation on a new computer:
> "Read `CONTEXT.md` in the project root. The project is a full-stack Student CRUD (Spring Boot + Vite React Tailwind CSS) with a strict 'No Modal' UI pattern and Render.com deployment configuration. Follow the guidelines and architecture described in `CONTEXT.md`."
