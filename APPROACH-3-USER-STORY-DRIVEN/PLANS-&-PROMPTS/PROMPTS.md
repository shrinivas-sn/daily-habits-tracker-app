# Approach 3: User-Story-Driven Development - Prompt Log

**Methodology:** Agile development based on a Product Backlog. Features are implemented sequentially to satisfy explicit Acceptance Criteria for each User Story.

---

## Story 1: Authentication

**User Input:**
> *"I am building a React web app using Tailwind CSS and Firebase v9. I am using a User-Story-Driven Development approach. We will build this one story at a time.*
> *Here is Story 1: As a user, I want to sign up and log in using my email and password so that my habit data is private and securely saved.*
> *Acceptance Criteria: Login/Signup form exists. Successfully authenticates via Firebase Auth. Unauthenticated users cannot see the dashboard.*
> *Please provide the code to fulfill ONLY this story. Create the Vite setup structure, the Firebase config, and the Auth screens. Do not build the habit tracking features yet."*

**AI Action:**
- Scaffolded a Vite React app and installed dependencies.
- Created `.env` and `firebase.js` for configuration.
- Developed an `Auth` component handling both Login and Signup.
- Built a minimal global auth state in `App.jsx` using `onAuthStateChanged`.
- Fulfilled acceptance criteria by ensuring unauthenticated users only see the Auth screen, while authenticated users see a secure Dashboard placeholder.
