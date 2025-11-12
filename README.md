# 🐾 WarmPaws – Pet Care in Winter

A cozy, winter-themed web app designed for pet owners to help keep their furry friends warm, safe, and happy during the cold season.  
**WarmPaws** connects users to local pet care services, winter clothing options, grooming tips, and expert veterinary advice — all in one friendly, responsive interface.

---

## 🌐 Live Demo
🔗 [Live URL] : https://boisterous-flan-cbbf90.netlify.app/

---

## 🎯 Purpose
WarmPaws was built to provide an intuitive and visually engaging platform for pet owners.  
It demonstrates a **full-stack-ready React project** focused on:
- Modern frontend development with **React + TailwindCSS**
- Responsive design with **DaisyUI**
- Secure Firebase Authentication
- Route protection and conditional rendering
- Interactive UI animations

---

## ✨ Key Features

### 🏠 Home Page
- Winter-themed **hero slider** with smooth transitions  
- **Popular Services** section (data from `public/data.json`)  
- **Winter Care Tips** and **Expert Vets** sections  
- Extra creative section related to pet well-being

### 💼 Services
- Fetches and displays all available winter pet services  
- Individual **Service Details Page** with booking form (protected route)

### 🔐 Authentication
- **Firebase Auth** with:
  - Email/Password signup & login
  - Google Sign-in integration
  - Password reset via email  
- Password validation (uppercase, lowercase, min 6 chars)
- **Profile management** (view and update user info)

### 👤 My Profile
- Displays user’s name, email, and profile photo
- Functional **Update Profile** form (using `updateProfile()`)

### 🧭 Routing
- Fully handled with **React Router DOM v6**
- **Protected Routes** for authenticated-only pages
- SPA behavior — no reload errors

### 💬 Notifications
- **react-hot-toast** for success/error alerts

### 🎨 UI & Animations
- **TailwindCSS + DaisyUI** for styling  
- **AOS**, **Animate.css**, and **React Spring** for smooth transitions and animations  
- **Responsive layout** for mobile, tablet, and desktop  

---

## 🧰 Tech Stack & Packages

| Category | Packages / Tools |
|-----------|------------------|
| **Frontend** | React, Vite |
| **Styling** | TailwindCSS, DaisyUI, Animate.css |
| **Routing** | react-router-dom |
| **Auth** | Firebase |
| **Animation & Effects** | AOS, React Spring |
| **UI/UX Enhancements** | react-hot-toast, Swiper (optional) |
| **Utilities** | dotenv (for env vars), ESLint |

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/warmpaws-pet-care.git

# Navigate into the folder
cd warmpaws-pet-care

# Install dependencies
npm install

# Create environment variables
touch .env.local
# Add your Firebase config keys here (see firebase.config.js)

# Run the development server
npm run dev
