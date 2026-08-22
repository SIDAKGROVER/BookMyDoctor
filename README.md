# BookMyDoctor: Doctor Appointment Booking & Management System

An end-to-end full-stack web application designed to facilitate seamless healthcare scheduling. The system offers three dedicated portals: a patient-facing booking interface, a doctor schedule management panel, and a central administration console.

---

## Developer Information
* **Developer Name:** Sidak Singh
* **Institution:** Chitkara University, Rajpura, Punjab
* **Project Type:** Academic Portfolio Project (Full-Stack Web Development)

---

## Key Features

### 1. Patient Portal (Frontend)
- **User Authentication:** Secure signup/login using JWT.
- **Doctor Discovery:** Filter doctors by specialty (General Physician, Gynecologist, Dermatologist, Pediatrician, Neurologist, Gastroenterologist).
- **Interactive Booking:** Choose specific, available date and time slots.
- **Appointment Tracking:** View appointment history, statuses (Completed, Cancelled), and make secure payments.
- **Profile Management:** Edit profile picture, contact details, gender, and date of birth.

### 2. Admin Portal
- **Dashboard Overview:** Displays global statistics including total doctors, total appointments, total earnings, and recent booking logs.
- **Doctor Management:** Add new doctors (with profile pictures, credentials, fees, experience, and specialties) and toggle their active/inactive status.
- **Appointment Monitoring:** View and moderate all active reservations across the system.

### 3. Doctor Portal
- **Consultation Scheduler:** Track patient appointments, mark them as completed, or cancel slots.
- **Earnings Insights:** View personal consultation revenues and statistics.
- **Profile Editing:** Update consultation fees, address, and availability status.

---

## Tech Stack

- **Frontend & Admin Panels:** React.js, TailwindCSS, Vite (Fast HMR, optimized builds).
- **Backend API:** Node.js, Express.js (REST API architecture).
- **Database:** MongoDB (Mongoose ODM) for schema definition, relationships, and queries.
- **File Storage:** Cloudinary integration for doctor & user profile picture uploads.
- **Payments:** Razorpay / Stripe integration placeholders.
- **Security:** bcrypt for password hashing, jsonwebtoken (JWT) for stateless sessions.

---

## Database Architecture (MongoDB Schemas)
- **User Schema:** Standard credentials, profile picture URL, address, gender, dob.
- **Doctor Schema:** Name, email, credentials, specialty, fee, availability, slots booked (nested mapping).
- **Appointment Schema:** Patient info, doctor info, slot time, slot date, amount, payment status, completion status, cancellation status.

---

## Setup & Local Installation

### Prerequisites
- Node.js (v16.x or higher)
- npm or yarn
- MongoDB Atlas cluster or local MongoDB service

### Installation Steps

1. **Clone & Navigate:**
   ```bash
   cd prescripto-full-stack
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` folder with the following configuration:
   ```env
   PORT=4000
   MONGODB_URI="your_mongodb_atlas_connection_string"
   JWT_SECRET="your_custom_jwt_secret"
   ADMIN_EMAIL="admin@example.com"
   ADMIN_PASSWORD="your_admin_password"
   CLOUDINARY_NAME="your_cloudinary_name"
   CLOUDINARY_API_KEY="your_cloudinary_api_key"
   CLOUDINARY_SECRET_KEY="your_cloudinary_secret_key"
   ```
   Start the backend server:
   ```bash
   npm run server
   ```

3. **Admin Setup:**
   ```bash
   cd ../admin
   npm install
   ```
   Create a `.env` file in the `admin` folder:
   ```env
   VITE_BACKEND_URL="http://localhost:4000"
   ```
   Start the admin panel:
   ```bash
   npm run dev
   ```

4. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   ```
   Create a `.env` file in the `frontend` folder:
   ```env
   VITE_BACKEND_URL="http://localhost:4000"
   ```
   Start the client panel:
   ```bash
   npm run dev
   ```

---

## Project Structure
```text
├── admin/          # Admin panel source code (React + Vite)
├── backend/        # REST API Server (Node + Express)
├── frontend/       # Patient-facing website (React + Vite)
└── README.md       # Project documentation
```
