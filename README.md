## 🌌 Nexus IAM: Identity & Access Management System

Nexus IAM is a high-performance Identity and Access Management solution designed for secure user governance, audit logging, and real-time analytics. It leverages modern cloud technologies to ensure organization-wide security.

# 🚀 Key Features

User Governance: Advanced lifecycle management for users and roles.

RBAC: Role-Based Access Control for fine-grained permissions.

Audit Logs: Complete history of system changes and access.

Analytics Dashboard: Interactive charts for data-driven decisions.

Secure Auth: Powered by Clerk for seamless identity management.

Scalable DB: Built on Supabase for robust data handling.

# 🛠 Tech Stack

- Frontend: React.js (Vite), Tailwind CSS, Framer Motion, Recharts

- Backend: Node.js, Express

- Authentication: Clerk

- Database: Supabase

- Icons: Lucide React

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

## ⚙️ Installation & Setup

Follow these steps carefully:

### 1. Clone the Repository
```bash
git clone https://github.com/ishita-20-6/nexus-iam.git
cd nexus-iam
```

### 2. Install Dependencies

#### Frontend Setup
```bash
cd client
npm install
```

#### Backend Setup
```bash
cd ../server
npm install
```

### 3. Configure Environment Variables
Create a `.env` file inside the client folder:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
```

### 4. Start Development Servers

#### Frontend
```bash
npm run dev
```

#### Backend
```bash
npm start
```
