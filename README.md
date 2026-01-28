# NNR Agent Control Panel

A professional management interface for AI content automation agents.

## Project Structure

- `frontend/`: React + Vite + TypeScript application
- `backend/`: Express + TypeScript API server

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation

1. Install dependencies for both frontend and backend:
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```

2. Start the development servers:

   **Backend:**
   ```bash
   cd backend
   npm run dev
   ```
   (Server runs on port 3100)

   **Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```
   (App runs on port 5173 - usually)

3. Open your browser to the frontend URL (e.g., http://localhost:5173).

## Features

- **Dashboard**: Real-time overview of agent statuses and system metrics.
- **Executions**: Detailed history of all agent runs with logs.
- **Agent Management**: (Partial) View and trigger agents.
- **Mock Data**: Currently runs with a mocked backend for demonstration.

## Technology Stack

- **Frontend**: React, Tailwind CSS, shadcn/ui, TanStack Query, Lucide Icons.
- **Backend**: Express.js, TypeScript.
