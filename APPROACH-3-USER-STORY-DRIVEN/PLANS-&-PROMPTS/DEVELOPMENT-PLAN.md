# Product Backlog: Daily Habits Tracker

## Priority 1: Authentication

**Story 1:** As a user, I want to sign up and log in using my email and password so that my habit data is private and securely saved.

- **Acceptance Criteria:** Login/Signup form exists. Successfully authenticates via Firebase Auth. Unauthenticated users cannot see the dashboard.

## Priority 2: Habit Creation

**Story 2:** As a user, I want to add a new custom habit (like "Read 10 pages") so that I have a goal to track.

- **Acceptance Criteria:** Dashboard has a text input and submit button. Submitting saves the habit to Firebase Firestore with a starting streak of 0.

## Priority 3: Daily Tracking

**Story 3:** As a user, I want to check off a habit for today so that I can maintain my streak.

- **Acceptance Criteria:** Habits render in a list with a checkbox. Clicking the checkbox updates the database and increments the streak counter.

## Priority 4: Analytics

**Story 4:** As a user, I want to see a weekly summary of my progress so I stay motivated.

- **Acceptance Criteria:** A section displays how many total habits were completed in the last 7 days.
