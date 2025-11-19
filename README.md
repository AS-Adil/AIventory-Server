# AIventory Server

Live API: [https://aiventory-server.vercel.app/](https://aiventory-server.vercel.app/) <!-- Replace with actual deployed server link -->

---

## 📖 Overview
AIventory Server is the **backend of the AIventory MERN stack application**.  
It provides REST APIs for managing AI models, handling user‑specific data, purchase tracking, and connecting the client to the MongoDB database.

---

## 🚀 Features
- ⚡ Scalable **Express.js + MongoDB** backend  
- 📊 Full CRUD operations for AI models  
- 🔍 Search and filter models using MongoDB queries  
- 🛒 Purchase tracking with user‑specific endpoints  
- 🛡️ Middleware for protected routes  

---

## 🛠️ Tech Stack
- **Backend Framework:** Node.js, Express.js  
- **Database:** MongoDB (native driver)  
- **Deployment:** Vercel / Render  

---

## 📦 Dependencies
- `express` – server framework  
- `mongodb` – database driver  
- `dotenv` – environment variable management  
- `cors` – cross‑origin resource sharing  

---

## ⚙️ Installation & Setup Guide

Follow these steps to run the server locally:

### 1️⃣ Clone the repository
```bash
git clone https://github.com/AS-Adil/AIventory-Server.git
cd AIventory-Server

 Install dependencies
npm install
Configure environment variables
PORT=5000
MONGO_URI=your_mongodb_connection_string
Run the server
nodemon index.js

