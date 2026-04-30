# Daily Habits Tracker - AI-Assisted Development Comparison Study

Welcome to the **Daily Habits Tracker** project! This repository serves as a structured learning exercise and comparison study on different AI-assisted development methodologies.

## 🎯 Assignment Overview

The objective of this project is to build the exact same application—a **Daily Habits Tracker**—three separate times, using three distinctly different approaches to prompt engineering and AI collaboration. This allows us to compare the results across code quality, development speed, token usage, and maintainability.

### The Application Requirements
- **Core Functionality:** Define custom habits (e.g., "Drink 8 glasses of water"), mark them complete daily.
- **Analytics:** View active streaks and see weekly/monthly summaries with charts.
- **Backend:** User authentication and cloud data storage (Firebase).
- **Tech Stack:** React (Vite), Tailwind CSS, Firebase (Auth/Firestore).

---

## 🚀 The Three Development Approaches

### 1. PRD-Driven Development (Completed ✅)
**Best for:** Complex apps with multiple stakeholders where the AI needs full context upfront.
- **Method:** Writing a comprehensive Product Requirements Document (PRD) before prompting, feeding it as system context, and having the AI generate the codebase in one pass.
- **Strengths:** High consistency, fewer clarification rounds.

### 2. Architecture-First Development (Pending ⏳)
**Best for:** Technical apps requiring clean separation of concerns.
- **Method:** Creating visual architecture diagrams, data models, and component trees first, then prompting the AI to build one module at a time.
- **Strengths:** Modular, highly debuggable, lower token cost per prompt.

### 3. User-Story-Driven Development (Pending ⏳)
**Best for:** MVPs and prototypes with evolving requirements.
- **Method:** Writing incremental user stories with acceptance criteria and implementing them one by one.
- **Strengths:** Highly testable at every step, adaptable to changing requirements.

---

## 💻 Approach 1: PRD-Driven Development (Completed)

### How it was built:
For Approach 1, we defined a complete `DEVELOPMENT-PLAN.md` detailing the problem statement, target users, tech stack, feature priorities (MoSCoW), and user flows. This document was used to generate the entire React application in a single conversational pass. The result is a fully functional tracker with a modern, dark-themed UI.

### 🛠️ Step-by-Step Setup Instructions

If you'd like to run the Approach 1 application locally, follow these steps:

**1. Clone the repository:**
```bash
git clone <your-repository-url>
cd DAILY-HAIBIT-TRACKER-ASSIGNMENT
```

**2. Navigate to the Approach 1 application folder:**
```bash
cd APPROACH-1-PRD/daily-habits-app
```

**3. Install dependencies:**
Make sure you have Node.js installed, then run:
```bash
npm install
```

**4. Run the development server:**
```bash
npm run dev
```

**5. View the app:**
Open your browser and navigate to `http://localhost:5173` (or the local URL provided in your terminal). You can sign up for a new account, add habits, and start tracking!

---
*Note: This repository uses a shared Firebase backend for simplicity across all three approaches. Collections for this specific app are isolated under `prd_habits`.*
