# AI Meeting Notes Summarizer — Frontend

React + Vite frontend for the AI Meeting Notes Summarizer application.

## Directory Structure and Ownership

```text
frontend/src/
├── app/                  # (Arun) App shell, router setup, global layout, navigation
├── components/shared/    # (Arun) Reusable UI library (Button, Card, Alert, StatusBadge, Navbar)
├── features/
│   ├── transcript-input/ # (Tamanna) Form input, .txt file import, preview, validation
│   ├── ai-summary/       # (Mehak) Summary panel, key points, decisions, regenerate controls
│   ├── meeting-library/  # (Saima) Saved meeting list, detail view, action-item editor
│   └── dashboard/        # (Arun) End-to-end orchestration, dashboard view
├── services/api/         # (Arun) Central HTTP client (client.js)
├── hooks/                # (Arun / Shared) Custom React hooks
└── styles/               # (Arun) Design tokens (variables.css) and global styling
```

## Quick Start (Windows / PowerShell)

### 1. Install Dependencies
```powershell
cd d:\IROP_PROJECT\frontend
npm install
```

### 2. Configure Environment
```powershell
cp .env.example .env
```

### 3. Start Development Server
```powershell
npm run dev
```
Open `http://localhost:5173` in your browser.

### 4. Run Frontend Tests
```powershell
npm test
```

## Styling System

The application uses standard CSS with modern **CSS Variables** defined in `src/styles/variables.css`.
Components use scoped class names or `.css` companion files without requiring external UI libraries.
All colors, border-radii, spacing, and shadows reference variables like `var(--color-primary)`, `var(--space-md)`, and `var(--radius-lg)`.
