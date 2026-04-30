# Product Requirements Document (PRD): Daily Habits Tracker

## 1. Problem Statement

Users need a centralized, simple web application to define, track, and visualize their daily habits to maintain consistency and achieve personal goals.

## 2. Target Users

Individuals looking to build and maintain daily routines (e.g., fitness tracking, hydration, reading).

## 3. Tech Stack

- **Frontend:** React (set up via Vite), Tailwind CSS for styling.
- **Backend & Authentication:** Firebase Backend as a Service (BaaS).
- **Database:** Firebase Firestore (Cloud Database).
- **Hosting:** Localhost for development.

## 4. Features (MoSCoW Prioritization)

- **Must Have:**
  - User authentication (Sign up / Login) using Firebase Auth.
  - Cloud data storage using Firebase Firestore.
  - Define custom habits (e.g., "Drink 8 glasses of water").
  - Mark habits as complete each day.
- **Should Have:**
  - Streak data calculation (consecutive days logged).
  - Weekly and monthly summary dashboards with simple charts.

## 5. User Flows

- **Onboarding:** Sign up -> Login -> Empty Dashboard.
- **Habit Creation:** Click "Add Habit" -> Enter Name/Goal -> Save to Firestore.
- **Daily Tracking:** View Today's Habits -> Click Checkbox -> Update Firestore -> Streak Updates.
- **Analytics:** Navigate to Summary Tab -> View Weekly/Monthly Charts.

## 6. Firebase Configuration

(AI Instruction: Use the following Firebase v9+ modular SDK configuration to initialize the app's backend)

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_AUTH_DOMAIN_HERE",
  projectId: "YOUR_PROJECT_ID_HERE",
  storageBucket: "YOUR_STORAGE_BUCKET_HERE",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID_HERE",
  appId: "YOUR_APP_ID_HERE",
};
```
