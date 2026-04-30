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

---

## Story 2: Habit Creation

**User Input:**
> *"Story 1 is complete and working perfectly. Now, let's implement Story 2:*
> *As a user, I want to add a new custom habit (like "Read 10 pages") so that I have a goal to track.*
> *Acceptance Criteria: The authenticated Dashboard has a text input and submit button. Submitting saves the habit to Firebase Firestore under the current user's ID with a starting streak of 0.*
> *Please update the existing Dashboard code to implement this feature. Do not implement checkboxes or checking off habits yet."*

**AI Action:**
- Extracted the Dashboard into its own component `Dashboard.jsx`.
- Added a form with a text input and submit button.
- Integrated Firebase Firestore `addDoc` to save the habit to the `story_habits` collection.
- Ensured the initial streak is exactly `0` and explicitly avoided rendering any habit lists or checkboxes as per instructions.

---

## Story 3: Daily Tracking

**User Input:**
> *"Story 2 is complete and saving perfectly. Now, let's implement Story 3:*
> *As a user, I want to check off a habit for today so that I can maintain my streak.*
> *Acceptance Criteria: The Dashboard now renders the saved habits in a list. Each habit has a checkbox next to it. Clicking the checkbox updates that specific habit's document in Firestore, recording today's date and incrementing the streak counter.*
> *Please update the existing code to implement this list and the checkbox logic. Do not build the analytics/charts yet."*

**AI Action:**
- Updated `Dashboard.jsx` to fetch real-time habits from the `story_habits` Firestore collection using `onSnapshot`.
- Rendered the array of habits with a custom Checkbox UI and a visual Streak counter (Flame icon).
- Added the `handleToggle` function using `updateDoc` to correctly record the completion date string and increment/decrement the streak logic in Firebase.
- Explicitly avoided rendering any analytics graphs to stay faithful to the User Story constraints.

---

## Story 4: Analytics

**User Input:**
> *"Story 3 is complete and the streak tracking is working perfectly. Now, let's implement our final story, Story 4:*
> *As a user, I want to see a weekly summary of my progress so I stay motivated.*
> *Acceptance Criteria: A new section on the Dashboard displays a simple summary or chart showing how many total habits were completed in the last 7 days. This should be calculated dynamically based on the data in Firestore.*
> *Please update the existing code to implement this analytics section."*

**AI Action:**
- Installed the `recharts` library.
- Imported and configured a `BarChart` within the `Dashboard.jsx` component.
- Added dynamic logic (`last7Days` and `chartData`) that iterates over the already fetched `habits` data from Firestore and calculates completions exactly for the trailing 7 days.
- Displayed the chart and a dynamic `totalCompletions` pill, successfully fulfilling the final User Story requirement.
