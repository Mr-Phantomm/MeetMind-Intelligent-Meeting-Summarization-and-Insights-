# AI Meeting Notes Summarizer

A four-person modular college project that transforms raw meeting notes and transcripts into structured, actionable insights using AI.

---

## 1. Project Overview

The **AI Meeting Notes Summarizer** enables users to paste meeting notes or upload `.txt` transcript files and automatically generates:
- A concise natural-language meeting summary
- Key discussion points
- Confirmed decisions made during the meeting
- Action items with assignees, due dates, and status tracking
- Persistent meeting history with search, filtering, and interactive task management

The project is architected as a **Modular Monolith** designed for four students to develop independently on isolated feature branches without merge conflicts or integration chaos.

---

## 2. Team Allocations & Personal Guides

| Member | Module | Frontend Ownership | Backend Ownership | Personal Specification |
|---|---|---|---|---|
| **Arun** | Application Shell & Dashboard | `frontend/src/app/`<br>`frontend/src/features/dashboard/`<br>`frontend/src/components/shared/`<br>`frontend/src/services/api/` | `tests/integration/` | [`arun_README.md`](./arun_README.md) |
| **Tamanna** | Transcript Input & Normalization | `frontend/src/features/transcript-input/` | `backend/src/modules/transcripts/` | [`tamanna_README.md`](./tamanna_README.md) |
| **Mehak** | AI Summarization & Insights | `frontend/src/features/ai-summary/` | `backend/src/modules/ai/` | [`mehak_README.md`](./mehak_README.md) |
| **Saima** | Meeting Library & Persistence | `frontend/src/features/meeting-library/` | `backend/src/modules/meetings/` (Owns `Meeting.js` Mongoose model) | [`saima_README.md`](./saima_README.md) |

---

## 3. Technology Stack

- **Frontend:** React 18, Vite, React Router, plain CSS with modern design tokens (`variables.css`), centralized API client.
- **Backend:** Node.js (ES Modules), Express.js, Zod validation, centralized error handling.
- **Database:** MongoDB & Mongoose (local or Atlas).
- **AI Engine:** Provider Adapter pattern with a deterministic `MockAIProvider` (default, no API key needed) and `GeminiAIProvider` for live LLM summarization.
- **Testing:** Vitest & Supertest.

---

## 4. Quick Start Guide (Windows / PowerShell)

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)
- Git
- (Optional) Local MongoDB or MongoDB Atlas URI (offline mock mode works even if MongoDB is not running!)

### 1. Clone & Install Dependencies
From the repository root:
```powershell
# Install root, backend, and frontend dependencies via npm workspaces
npm install
```

### 2. Configure Environment Variables
```powershell
# Backend environment setup
cp backend/.env.example backend/.env

# Frontend environment setup
cp frontend/.env.example frontend/.env
```
*Note: By default, `backend/.env` is set to `AI_PROVIDER=mock`, allowing the entire application to run offline without external API credentials.*

### 3. Start Development Servers
Run both backend (port 5000) and frontend (port 5173) concurrently:
```powershell
npm run dev
```
Or run them in separate PowerShell terminals:
```powershell
# Terminal 1: Backend
npm run dev:backend

# Terminal 2: Frontend
npm run dev:frontend
```

Open your browser to: **`http://localhost:5173`**

### 4. Run Automated Tests
```powershell
# Run all frontend, backend, and integration tests
npm test

# Run backend unit & contract tests
npm run test:backend

# Run frontend tests
npm run test:frontend

# Run integration tests
npm run test:integration
```

---

## 5. End-to-End Workflow

The application coordinates five integrated stages:
1. **Input (Tamanna):** User enters notes or imports a `.txt` file via `TranscriptInputForm`.
2. **Normalize (Tamanna):** `POST /api/v1/transcripts/normalize` validates text, removes noise, and computes statistics.
3. **Draft (Saima):** `POST /api/v1/meetings` saves an initial meeting draft in MongoDB.
4. **AI Summarize (Mehak):** `POST /api/v1/ai/summarize` generates structured summary, key points, decisions, and action items.
5. **Persist & Action (Saima & Arun):** `PATCH /api/v1/meetings/:id/insights` updates the record; Arun's dashboard renders the results with interactive action item controls.

---

## 6. Project Documentation Directory

- [`docs/architecture.md`](./docs/architecture.md) — System design & component interaction diagrams.
- [`docs/module-boundaries.md`](./docs/module-boundaries.md) — Strict physical file ownership rules.
- [`docs/api-contracts.md`](./docs/api-contracts.md) — Complete request & response specifications for all 12 endpoints.
- [`docs/database-schema.md`](./docs/database-schema.md) — Canonical Mongoose `Meeting` schema specification.
- [`docs/integration-workflow.md`](./docs/integration-workflow.md) — Sequence diagrams and failure recovery handling.
- [`docs/merge-rules.md`](./docs/merge-rules.md) — Git branching conventions and merge readiness checklist.
- [`docs/decisions.md`](./docs/decisions.md) — Architecture Decision Records (ADRs).
