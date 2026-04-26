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

Frontend: React.js (Vite), Tailwind CSS, Framer Motion, Recharts

Backend: Node.js, Express

Authentication: Clerk

Database: Supabase

Icons: Lucide React

📂 Project Structure

nexus-iam/
├── client/                # React Frontend (Vite)
│   └── src/
│       ├── components/    # Governance, Logs, Charts, etc.
│       ├── supabase/      # Client Configuration
│       └── App.jsx        # Routing & Logic
├── server/                # Node.js Backend
└── .gitignore             # Security filters


# ⚙️ Installation & Setup

Follow these bolded steps carefully to get the project running:

* 1. Clone the Repository

git clone [https://github.com/ishita-20-6/nexus-iam.git](https://github.com/ishita-20-6/nexus-iam.git)
cd nexus-iam


* 2. Install All Dependencies

---Install packages for both folders:

Frontend Setup:

cd client
npm install


Backend Setup:

cd ../server
npm install


3. Configure Environment Variables

Create a .env file inside the client folder and paste your keys:

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key


4. Start Development Servers

Frontend (Client folder):

npm run dev


Backend (Server folder):

npm start


🤝 Contributing

Fork the repo.

Create a Feature Branch.

Commit changes.

Open a Pull Request.

📜 License

Distributed under the MIT License.

📧 Contact

Maintainer: ishita-20-6

Repo: Nexus-IAM Source

© 2024 Nexus IAM - Secured & Scalable Architecture
