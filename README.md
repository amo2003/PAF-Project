# 📘 IT3030 – PAF Assignment 2026  
## Smart Campus Operations Hub

A full-stack web application for managing university facilities, bookings, and maintenance workflows with role-based access and real-time notifications.

---

## 🚀 Tech Stack
Backend: Spring Boot, JPA/Hibernate, MySQL/MongoDB, Spring Security (OAuth2)  
Frontend: React.js, Axios, React Router  
DevOps: GitHub, GitHub Actions  

---

## 📌 Core Features

🏢 Facilities & Assets
- Manage rooms, labs, and equipment  
- Metadata: type, capacity, location, status  
- Search & filter support  

📅 Booking Management
- Request bookings (date, time, purpose)  
- Workflow: PENDING → APPROVED/REJECTED → CANCELLED  
- Conflict detection (no overlapping bookings)  
- Admin approval system  

🛠️ Incident Tickets
- Create tickets with priority, category, description  
- Upload up to 3 images  
- Workflow: OPEN → IN_PROGRESS → RESOLVED → CLOSED  
- Technician assignment + comments  

🔔 Notifications
- Booking updates, ticket status changes, comments  
- Notification panel in UI  

🔐 Authentication & Authorization
- OAuth 2.0 (Google login)  
- Roles: USER, ADMIN, (TECHNICIAN optional)  

---

## 🧱 Architecture
Backend: Controller → Service → Repository → Model  
Frontend: Pages → Components → API Services  

---

## ⚙️ Setup

Backend
cd backend  
mvn clean install  
mvn spring-boot:run  

Frontend
cd frontend  
npm install  
npm start  

---

## 🧪 Testing
- Postman collection included  
- Unit & integration tests  
- Input validation & error handling implemented  

---

## 👥 Team Contributions
- Member 1: Facilities module  
- Member 2: Booking system  
- Member 3: Incident tickets  
- Member 4: Notifications & Auth  

---

## 📄 Submission
Repo: it3030-paf-2026-smart-campus-groupXX  
Report: IT3030_PAF_Assignment_2026_GroupXX.pdf  

---

## 💡 Optional Features
- QR check-in  
- Admin dashboard  
- Notification preferences  

---

## 👨‍💻 Authors
Group XX – SLIIT Faculty of Computing  
