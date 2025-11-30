# Mini Audit Trail Generator

A micro web app that automatically tracks changes between text versions. It generates a detailed audit trail showing exactly which words were added or removed, along with timestamped history.

🚀 **Live Deployment:** [https://audit-trail-app-three.vercel.app/](https://audit-trail-app-three.vercel.app/)

## 📋 Features
* **Smart Diff Logic:** Custom algorithm to detect added and removed words (ignoring punctuation).
* **Version History:** Stores a chronological list of all edits.
* **Full Stack:** Built with Next.js App Router (Frontend + API).
* **Type Safety:** Fully typed with TypeScript.
* **In-Memory Storage:** Uses a temporary server-side array for data persistence during the session.

## 🛠️ Tech Stack
* **Framework:** Next.js 15
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Utilities:** UUID (for unique IDs)

## ⚙️ Prerequisites
To run this project locally, you need:
* **Node.js**: Version 20.x or higher
* **npm**: Installed with Node.js

## 🚀 Getting Started locally

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/gunas-ui13/audit-trail-app.git](https://github.com/gunas-ui13/audit-trail-app.git)
    cd audit-trail-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open in browser:**
    Navigate to `http://localhost:3000`