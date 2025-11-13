Perfect 👍 — having that **“Expiring Soon”** section adds a smart, functional touch and completes your frontend nicely.  

Here’s a **complete README.md** written specifically for your **PlateShare Front‑End**, reflecting everything we’ve built (including Expiring Soon).  
You can copy‑paste this directly into your repo root.

---

# 🥗 PlateShare — Frontend (Community Food Sharing Platform)

### **Overview**
**PlateShare** is a community‑driven MERN web application that helps reduce food waste by connecting people who have surplus meals with those in need.  
This repository contains the **frontend** built with **React**, **TailwindCSS**, **DaisyUI**, **Firebase Authentication**, and **Lottie animations**.

---

## 🚀 **Features**

### 🔐 Authentication
- Email/password signup and login with Firebase.  
- Google OAuth sign‑in support.  
- Persistent login state across route reloads.  
- Dynamic Navbar that changes based on user auth state.

---

### 🍛 Food Management (CRUD)
- **Add Food** — Logged‑in users can upload a food post with image (imgbb upload integrated).  
- **View Available Foods** — Public list of all available foods from database.  
- **Manage My Foods** — Private section with all foods added by current user (Update/Delete support with modal and confirmation alerts).  
- **Expiring Soon Section** — Displays the 3 food items closest to their expiry date to encourage faster redistribution.

---

### 🤝 Food Request System
- Users can request any available food through a modal form.  
- Request data stored in `/api/requests`.  
- Food donors can view all requests for their foods, and **Accept / Reject** them.  
- Status updates reflect in both request and food documents.  
- Users can track all their requests under **“My Food Requests”** with live status (Pending / Accepted / Rejected).

---

### 🏡 Pages
| Route | Description | Access |
|-------|--------------|--------|
| `/` | Home page with animated hero, Featured Foods, Expiring Soon, and How It Works | Public |
| `/available-foods` | All foods with status “Available” | Public |
| `/food/:id` | Detailed view with Request modal or Request table (if donor) | Private |
| `/add-food` | Add new food item (imgbb image hosting) | Private |
| `/manage-my-foods` | Manage added foods (Update/Delete) | Private |
| `/my-requests` | View all food requests by logged‑in user | Private |
| `/login` | Email & Google login | Public |
| `/register` | Email & Google signup | Public |
| `*` | 404 Error page | Public |

---

## **UI and Design**
- Fully responsive (mobile → desktop).  
- Styled using **TailwindCSS** + **DaisyUI** components.  
- Smooth scroll & fade effects with **AOS (Animate On Scroll)**.  
- Engaging motion using **Lottie animations** for hero and decorative accents.  
- Consistent color theme and spacing for clean visuals.  
- Toast notifications (`react-hot-toast`) and confirmation popups (`SweetAlert2`) for great UX.

---

## 🧩 **Tech Stack**

### Frontend
- **React (Vite)** — component‑based SPA  
- **React Router v7** — SPA routing (`react-router`)  
- **Firebase** — Authentication  
- **TailwindCSS + DaisyUI** — responsive UI & components  
- **Lottie‑React** — vector animations  
- **AOS** — on‑scroll animations  
- **SweetAlert2** — confirmation dialogs  
- **React Hot Toast** — notifications  

### Backend (connected separately)
- **Express.js + MongoDB** — API and database  
- **imgbb** — image hosting for uploaded food pictures  

---

## ⚙️ **Environment Variables**
Create a `.env` file in the project root and add your own values:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_IMGBB_API_KEY=your_imgbb_key
```

> `.env` is already added to `.gitignore` for security.

---

## 📂 **Project Structure**

```
src/
├── auth/
│   ├── firebase.config.js
│   └── AuthProvider.jsx
├── components/
│   ├── Navbar.jsx / Footer.jsx
│   ├── Loader.jsx / FoodCard.jsx
│   ├── RequestModal.jsx / StaticSections.jsx
├── layouts/
│   └── MainLayout.jsx
├── pages/
│   ├── Home.jsx
│   ├── AvailableFoods.jsx
│   ├── AddFood.jsx
│   ├── ManageMyFoods.jsx
│   ├── MyRequests.jsx
│   ├── FoodDetails.jsx
│   ├── Register.jsx / Login.jsx
│   └── ErrorPage.jsx
├── routes/
│   ├── router.jsx
│   └── PrivateRoute.jsx
└── assets/
    ├── animations/
    │   ├── heroFood.json
    │   └── donate.json
    └── bg.jpg
```

---



## 💡 **Installation and Setup**

1. **Clone the repository**
   ```bash
   clone the repo
   cd to directory
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add environment variables**
   - Create `.env` in root  
   - Paste your Firebase + imgbb keys  

4. **Run the project**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

---



---

## 🤝 **Contributing**
Pull requests are welcome!  
For significant changes, please open an issue first to discuss what you’d like to modify.

---

## 🏁 **Deployment Example**
Frontend: **Netlify**  
Backend: **Vercel**  
Firebase: configured for authorized domain matching Netlify app.  

---

## 📸 **Preview**

| Section | Description |
|----------|--------------|
| **Hero** | Animated Lottie hero with call‑to‑action button |
| **Featured Foods** | Top 6 by quantity |
| **Expiring Soon** | 3 closest expiry items |
| **Available Foods** | All public foods grid |
| **Dashboard** | “Manage My Foods” + “My Requests” sections |
| **Request System** | Submit, track, accept/reject |

---

### 💬 **Summary**
The PlateShare frontend is a polished, production‑ready React SPA that ties seamlessly into a Node/Express backend — optimized for UI, performance, and real‑world usability while promoting food donation and community impact.

---

