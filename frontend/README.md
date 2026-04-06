# User Management React Frontend

A modern, responsive React frontend for User Management CRUD APIs, built with React 18, Vite, and Tailwind CSS.

## ✨ Features

- **Responsive UI**: Optimized for mobile, tablet, and desktop views.
- **Modern Design**: Sleek glassmorphism style with soft shadows and smooth animations.
- **API + Dummy Data Fallback**: Seamlessly switches to local JSON data if the backend is unavailable.
- **Environment Configuration**: Easily toggle between real API and mock data.
- **Clean Architecture**: Service-oriented architecture with reusable components.
- **CRUD Operations**: Full support for creating, reading, updating, and deleting users.

## 🛠 Tech Stack

- **React 18**: Frontend library.
- **Vite**: Fast build tool and dev server.
- **Tailwind CSS**: Utility-first CSS framework.
- **Axios**: Promise-based HTTP client for API calls.
- **React Router DOM**: Declarative routing for React.
- **Lucide React**: Beautifully simple icons.
- **Motion**: Production-ready animations.

## 📂 Project Structure

```text
src/
├── components/     # Reusable UI components (Navbar, UserCard, etc.)
├── pages/          # Page components (Dashboard, Users, etc.)
├── services/       # API and data fetching logic
├── utils/          # Helper functions and utilities
├── lib/            # Shared libraries and config (Tailwind utils)
├── types.ts        # TypeScript interfaces
├── App.tsx         # Main application component & routing
└── index.css       # Global styles & Tailwind imports

public/
└── data/
    └── users.json  # Dummy data for fallback
```

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_USE_API=true
```

## 🔁 Data Source Logic

| Condition | Data Source |
|-----------|-------------|
| `VITE_USE_API=true` | Backend API |
| `VITE_USE_API=false` | Dummy JSON (`/data/users.json`) |
| API Failure | Dummy JSON fallback automatically |

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

## 📡 API Endpoints Used

The application expects the following endpoints from your Spring Boot backend:

- `GET /users` - Fetch all users
- `GET /users/{id}` - Fetch a single user by ID
- `POST /users` - Create a new user
- `PUT /users/{id}` - Update an existing user
- `DELETE /users/{id}` - Delete a user

## 🎨 UI Design Principles

- **Glassmorphism**: Semi-transparent backgrounds with backdrop blur.
- **Soft UI**: Subtle shadows and rounded corners (`rounded-3xl`).
- **Typography**: Clean sans-serif (Inter) for maximum legibility.
- **Animations**: Subtle entry and hover effects using `motion`.

## 📱 Responsive Behavior

- **Mobile**: Tables transform into card views for better readability.
- **Tablet**: Multi-column grid layouts adapt to screen width.
- **Desktop**: Full-featured data tables and expansive dashboard views.

---

Generated with ❤️ for User Management System
