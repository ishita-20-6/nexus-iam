\documentclass[11pt, a4paper]{article}

% --- UNIVERSAL PREAMBLE BLOCK ---
\usepackage[a4paper, top=2.5cm, bottom=2.5cm, left=2cm, right=2cm]{geometry}
\usepackage{fontspec}
\usepackage[english, bidi=basic, provide=*]{babel}
\babelprovide[import, onchar=ids fonts]{english}
\babelfont{rm}{Noto Sans}

\usepackage{amsmath}
\usepackage{booktabs}
\usepackage{enumitem}
\usepackage{xcolor}
\usepackage{listings}
\usepackage[hidelinks]{hyperref}

% Code block styling
\definecolor{codegray}{rgb}{0.95,0.95,0.95}
\lstset{
    backgroundcolor=\color{codegray},
    basicstyle=\ttfamily\small,
    breaklines=true,
    frame=single,
    rulecolor=\color{lightgray},
    marginparsep=5pt,
    xleftmargin=10pt
}

\begin{document}

\begin{center}
    {\Huge \textbf{Nexus.IAM}} \\
    \vspace{0.5cm}
    {\Large Identity \& Access Management System} \\
    \vspace{1cm}
\end{center}

\section*{Project Overview}
Nexus.IAM is a modern, secure, and real-time Identity \& Access Management (IAM) dashboard. It provides administrators with a comprehensive overview of system security, user governance, and real-time activity tracking using a sleek, interactive interface.

\section*{Key Features}
\begin{itemize}
    \item \textbf{Real-time Audit Logs}: Powered by Supabase Real-time to track user activities and security events with live data visualization.
    \item \textbf{User Governance}: Full control over user roles. Admins can promote users (Viewer to Admin) or revoke access instantly.
    \item \textbf{Role-Based Access Control (RBAC)}: Securely restricts sensitive administrative actions based on verified user roles.
    \item \textbf{Modern UI/UX}: Built with a "Bento Grid" layout, utilizing Tailwind CSS for dark mode and Framer Motion for smooth animations.
    \item \textbf{Secure Authentication}: Integrated with Clerk for robust session management and multi-factor authentication.
\end{itemize}

\section*{Project Structure}
\begin{lstlisting}[language=bash]
nexus-iam/
├── client/              # React Frontend (Vite)
│   ├── src/
│   │   ├── components/  # UserGovernance, AuditLogs, Charts, etc.
│   │   ├── supabase/    # Supabase Client Configuration
│   │   └── App.jsx      # Main application logic & routing
├── server/              # Node.js Backend / Server Configuration
└── .gitignore           # Security: Prevents .env and node_modules
\end{lstlisting}

\section*{Tech Stack}
\begin{itemize}
    \item \textbf{Frontend}: React.js (Vite), Tailwind CSS, Lucide Icons, Recharts.
    \item \textbf{Backend/Database}: Supabase (PostgreSQL \& Real-time engine).
    \item \textbf{Authentication}: Clerk Auth.
    \item \textbf{Animations}: Framer Motion.
\end{itemize}

\section*{Installation \& Setup}

\subsection*{1. Clone the Repository}
\begin{lstlisting}[language=bash]
git clone https://github.com/ishita-20-6/nexus-iam.git
cd nexus-iam
\end{lstlisting}

\subsection*{2. Install Dependencies}
\textbf{Frontend Setup:}
\begin{lstlisting}[language=bash]
cd client
npm install
\end{lstlisting}

\textbf{Backend Setup:}
\begin{lstlisting}[language=bash]
cd ../server
npm install
\end{lstlisting}

\subsection*{3. Environment Variables (.env)}
Create a \texttt{.env} file inside the \texttt{client} directory:
\begin{lstlisting}
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
\end{lstlisting}

\subsection*{4. Run the Development Server}
\begin{lstlisting}[language=bash]
npm run dev
\end{lstlisting}

\vspace{2cm}
\begin{center}
    \textit{Developed with ❤️ by Ishita}
\end{center}

\end{document}
