📘 IT3030 – PAF Assignment 2026
Smart Campus Operations Hub

A full-stack web application designed to manage university facilities, bookings, and maintenance workflows. This system provides a centralised platform for students, staff, and administrators to efficiently handle campus operations.

🚀 Tech Stack
Backend
Java + Spring Boot
Spring Security (OAuth 2.0)
RESTful API
MySQL / MongoDB

Frontend
React.js
Axios
React Router
Tailwind CSS / Bootstrap (optional)

GitHub (Version Control)

📌 Features
🏢 Module A – Facilities & Assets Catalogue
Manage resources (rooms, labs, equipment)
Metadata: type, capacity, location, availability
Search & filter functionality
Status tracking (ACTIVE / OUT_OF_SERVICE)

📅 Module B – Booking Management
Create booking requests

Workflow:
PENDING → APPROVED / REJECTED → CANCELLED
Conflict detection (no overlapping bookings)
Admin approval system
User-specific booking views

🛠️ Module C – Maintenance & Incident Tickets
Create incident tickets with:
Category
Description
Priority
Upload up to 3 images

Workflow:
OPEN → IN_PROGRESS → RESOLVED → CLOSED
Technician assignment
Comments system with ownership rules

🔔 Module D – Notifications

Booking updates (approved/rejected)
Ticket status changes
Comment notifications
Notification panel in UI

🔐 Module E – Authentication & Authorisation

OAuth 2.0 (Google Login)
Role-based access control:
USER
ADMIN
TECHNICIAN (optional)

🧱 System Architecture
Backend Architecture (Layered)
Controller → Service → Repository → Model

Frontend Architecture
Pages → Components → Services (API Calls)

🧑‍🤝‍🧑 Team Contributions
Member	Responsibility
Member 1	Facilities & Resources Module
Member 2	Booking Management
Member 3	Incident & Ticket System
Member 4	Notifications + Auth
