# 🛡️ Nexus.IAM - Identity & Access Management System

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)

Nexus.IAM is a modern, secure, and real-time Identity & Access Management (IAM) dashboard. It is designed to provide administrators with a comprehensive overview of system security, user governance, and real-time activity tracking.

## 🚀 Key Features

- **Real-time Audit Logs**: Leverages Supabase Real-time to track user activities and security events with interactive live graphs.
- **User Governance**: Robust multi-level access control. Administrators can promote users (e.g., Viewer to Admin) or revoke access instantly.
- **Role-Based Access Control (RBAC)**: Securely restricts sensitive pages and administrative actions based on user roles.
- **Aesthetic UI/UX**: Designed with a "Bento Grid" layout, utilizing Tailwind CSS for a sleek dark mode and Framer Motion for smooth transitions.
- **Advanced Authentication**: Integrated with Clerk for secure login, session management, and multi-factor authentication support.

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite), Tailwind CSS, Lucide Icons, Recharts (Data Visualization).
- **Backend/Database**: Supabase (PostgreSQL & Real-time engine).
- **Authentication**: Clerk Auth.
- **Animations**: Framer Motion.

## 📂 Project Structure

```text
nexus-iam/
├── client/              # React Frontend (Vite)
│   ├── src/
│   │   ├── components/  # UserGovernance, AuditLogs, Charts, etc.
│   │   ├── supabase/    # Supabase Client Configuration
│   │   └── App.jsx      # Main application logic & routing
├── server/              # Node.js Backend / Server Configuration
└── .gitignore           # Security: Ensures .env and node_modules are not tracked

`---`

## ⚙️ Installation & Setup
Follow these steps to set up the project locally:

1. Clone the Repository
Bash
git clone [https://github.com/ishita-20-6/nexus-iam.git](https://github.com/ishita-20-6/nexus-iam.git)
cd nexus-iam
2. Install Dependencies
You need to install dependencies for both the frontend and the backend:

Frontend Setup:

Bash
cd client
npm install
Backend Setup:

Bash
cd ../server
npm install
3. Environment Variables (.env)
Create a .env file inside the client directory and add your API keys:

Code snippet
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
4. Run the Development Server
Bash
# To start the frontend (run from the client folder)
npm run dev
🛡️ Security Best Practices
This repository is configured to ignore .env files to prevent the leaking of private API keys. When deploying, ensure that you set these environment variables manually in your hosting provider's dashboard (e.g., Vercel, Netlify).
