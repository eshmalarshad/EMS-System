# Employee Management System (EMS)

A comprehensive full-stack employee management platform designed to streamline HR operations. The system provides robust role-based access control and enables seamless management of attendance, leave requests, and payroll operations.

##  Live Demo

**[View Live Demo](https://ems-system-six.vercel.app/)**

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [License](#license)

##  Features

- **Role-Based Authentication**: Secure login and registration with three distinct user roles (Admin, HR, Employee) and granular access control
- **Attendance Management**: Track and monitor employee attendance with detailed records and analytics
- **Leave Management**: Streamlined leave request workflow with approval system and compliance tracking
- **Payroll Management**: Comprehensive payroll processing and salary management capabilities
- **User Management**: Administrative tools for user account creation, modification, and access control
- **Secure Password Handling**: Industry-standard bcrypt encryption for password security
- **JWT-Based Sessions**: Stateless authentication using JSON Web Tokens for scalability

##  Tech Stack

### Frontend
- **React 19** — Modern React with latest features and optimizations
- **Vite** — Lightning-fast build tool for development and production
- **Tailwind CSS** — Utility-first CSS framework for responsive design
- **React Router** — Client-side routing and navigation
- **Axios** — Promise-based HTTP client for API communication

### Backend
- **Express.js** — Lightweight and flexible Node.js web framework
- **MongoDB + Mongoose** — NoSQL database with schema validation
- **JWT Authentication** — Secure token-based authentication
- **bcrypt** — Password hashing and security

##  Getting Started

### Prerequisites

Ensure you have the following installed on your system:
- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn** (package manager)

### Installation

#### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following environment variables:
   ```env
   PORT=5000
   MONGODB_URI=Your_mongodb_connectionstring
   JWT_SECRET=your_secure_jwt_secret_key
   ```

4. Start the MongoDB server:
   ```bash
   mongod
   ```

5. (Optional) Seed the database with sample data:
   ```bash
   npm run seed
   ```

6. Start the backend server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000`

#### Frontend Setup

1. Navigate to the root directory and install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

##  Project Structure

```
ems-system/
├── backend/
│   ├── config/              # Database and environment configuration
│   ├── controllers/         # Request handlers and business logic
│   ├── middleware/          # Authentication and authorization middleware
│   ├── models/              # Mongoose schemas and data models
│   ├── routes/              # API endpoint definitions
│   └── .env                 # Environment variables (create this file)
│
├── src/
│   ├── components/          # Reusable React components
│   ├── pages/               # Page-level components
│   ├── context/             # React Context for global state (auth, etc.)
│   ├── utils/               # API utilities and helper functions
│   └── App.jsx              # Root application component
│
├── public/                  # Static assets and favicon
├── package.json             # Project dependencies and scripts
└── vite.config.js          # Vite configuration
```

##  Usage

### For Administrators
- Create and manage user accounts across all roles
- Monitor system-wide attendance and payroll
- Generate reports and analytics

### For HR Managers
- Process and approve leave requests
- Manage attendance records
- Handle payroll administration
- Monitor employee performance

### For Employees
- View and request leaves
- Check attendance records
- Access payroll information
- Update personal information

