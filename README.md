# 🏋️ FitSphere – Fitness Tracker Web App

**FitSphere** is a powerful full-stack web application built for fitness enthusiasts, trainers, and administrators. It enables users to find and book fitness classes, track their health journey, communicate with certified trainers, and participate in an active fitness community. Designed with a clean, responsive UI and modern technologies, **FitSphere** helps streamline health tracking and class management.

---

## 🌐 Live Preview

🚀 Visit the live site here:  
👉 **[https://fitsphere-e30b9.web.app/](https://fitsphere-e30b9.web.app/)**

---

## 🔍 Project Overview

FitSphere empowers fitness professionals and enthusiasts by offering a unified digital platform to:

- 💪 **Discover & Book Fitness Classes** – Members can browse a variety of fitness programs such as Yoga, HIIT, Cardio, and Strength Training, filtered by availability and trainer expertise.
- 🧑‍🏫 **Trainer Onboarding & Management** – Trainers can apply to join the platform, manage their classes and availability slots, and connect with members directly.
- 👥 **Role-Based Dashboards** – The app features custom dashboards for Admins, Trainers, and Members, each tailored with relevant tools and data insights.
- 💳 **Secure Stripe Payments** – Built-in payment system for hassle-free booking and class registration.
- 🔐 **Authentication & Authorization** – Firebase and JWT are used for robust, secure user management with role-based access control.
- 🌐 **Community Forum** – Engage in discussions, share tips, and ask questions with role badges (Admin/Trainer).
- 📅 **Schedule & Activity Logs** – Track personal bookings, activity history, and trainer application statuses.
- 📱 **Mobile Responsive** – Fully optimized for all screen sizes with a beautiful dark/light mode toggle.

---

## 🚀 Tech Stack

- ⚛️ **React + Vite**
- 🎨 **Tailwind CSS**, **Material UI**, **ShadCN/UI**
- 🔐 **Firebase Auth**, **JWT**
- 🌐 **Express.js + MongoDB (MERN Stack)**
- 🧠 **React Hook Form**, **TanStack Query**
- 💳 **Stripe Payment Integration**
- 📦 **Axios**, **React Router DOM**

---

## 📂 Project Structure

```bash
src/
├── components/       # UI Components (Cards, Buttons, Loaders)
├── hooks/            # useAuth, useAxiosSecure, etc.
├── layouts/          # Main & Dashboard Layouts
├── pages/            # Route Pages (Public & Private)
├── routes/           # ProtectedRoute, RoleBasedRoute
├── services/         # API functions
└── utils/            # Helper functions & constants
```
