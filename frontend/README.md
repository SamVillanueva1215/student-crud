# Student CRUD Frontend (Vite + React + Tailwind CSS)

A modern, responsive frontend application for the **Student API** built with **Vite**, **React (JavaScript)**, and **Tailwind CSS**.

## ✨ Features

- **Strictly No Modals**: All operations (Create, Read, Update, Delete) are managed directly on the page.
- **Inline Form Card**:
  - Automatically switches between **Add New Student** and **Edit Student** modes.
  - Prepopulates input fields when editing, with a "Cancel Edit" button.
  - Input validation (prevents empty submissions).
- **Interactive Directory Table**:
  - Live search/filtering across first name, last name, course, and section.
  - Course and Section badges.
  - **Inline Delete Confirmation**: Clicking "Delete" transforms the button into a safety confirmation (`Confirm? [Yes] [No]`) without popups.
- **Vite Proxy Configured**: Development server automatically proxies requests to `http://localhost:8080/villanueva/students`, avoiding CORS restrictions.
- **Alert Banners**: Auto-dismissing success and error notifications.

---

## 🚀 Getting Started

### 1. Ensure Backend is Running
Make sure your Spring Boot Student API is running on port `8080`:
```powershell
cd ..\student
.\mvnw.cmd spring-boot:run
```

### 2. Run Frontend Development Server
From the `frontend` directory:
```powershell
npm run dev
```

Open your browser at `http://localhost:5173`.

---

## 📁 File Structure

```text
frontend/
├── src/
│   ├── components/
│   │   ├── AlertBanner.jsx     # Feedback toast / banner
│   │   ├── Navbar.jsx          # Header with registry branding & counter
│   │   ├── StudentForm.jsx     # On-page inline form (Add & Edit)
│   │   ├── StudentRow.jsx      # Table row with inline delete confirmation
│   │   └── StudentTable.jsx    # Table with search filter & empty states
│   ├── services/
│   │   └── studentApi.js       # Axios service for CRUD endpoints
│   ├── App.jsx                 # Main state coordinator
│   ├── index.css               # Tailwind CSS import
│   └── main.jsx                # Application root
├── index.html
├── package.json
└── vite.config.js              # Vite server & backend proxy configuration
```
