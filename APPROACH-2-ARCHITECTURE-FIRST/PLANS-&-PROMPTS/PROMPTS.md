# Approach 2: Architecture-First Development - Prompt Log

**Methodology:** Provide structural context via Architecture Diagrams, then build the application sequentially, module by module, explicitly instructing the AI *not* to build everything at once.

---

## Context Injection

The AI was provided with a visual architecture mapped to Mermaid JS code, outlining:
- The Component Tree (`App`, `AuthScreen`, `Dashboard`, `HabitList`, etc.)
- State Management (`AuthContext`, `HabitContext`)
- Database Schema (`users` and `habits` collections)

---

## Prompt 1: The Foundation & Auth Module

**User Input:**
> *"Here is the architecture diagram for my React, Tailwind, and Firebase Daily Habits Tracker. Following an architecture-first approach, do NOT build the whole app at once. Please implement ONLY the AuthContext (from State Management) and the AuthScreen (from the Component Tree) to start."*

**AI Action:**
- Scaffolded the React app, installed Tailwind v4 and Firebase.
- Created `AuthContext.jsx` and `AuthScreen.jsx` exactly as specified, leaving placeholders for the rest of the application.

---

## Prompt 2: Main View & Global State Shell

**User Input:**
> *"The AuthScreen and AuthContext are working perfectly. Now, looking at the architecture diagram, please implement the HabitContext (from State Management) and the Dashboard Main View along with its Header (from the Component Tree). The Header should display the user's email and have a working Logout button."*

**AI Action:**
- Created `HabitContext` to fetch data from Firestore.
- Built the `Header` component and the main `Dashboard` layout, explicitly maintaining placeholder boxes for the unbuilt sub-components (`AddHabitForm`, `HabitList`, `AnalyticsSummary`).

---

## Prompt 3: Data Entry Module

**User Input:**
> *"The Dashboard and Header are working perfectly with the placeholders. Now, looking at the architecture diagram, please implement the AddHabitForm module. Replace the [ Placeholder for AddHabitForm ] in the Dashboard with this new component. It should include a text input for the habit title and a submit button, and it should save the new habit directly to the Firebase habits collection via our HabitContext."*

**AI Action:**
- Created `AddHabitForm.jsx` with input and submit logic.
- Implemented the `addHabit` Firebase `addDoc` logic inside `HabitContext`.

*(Note: Additional corrective prompts were used here to ensure data was saving to the correct isolated collection and to immediately build out the `HabitList` and `HabitItem` components so data could be visualized).*

---

## Prompt 4: The Analytics Module

**User Input:**
> *"The HabitItem checkbox and streak logic are working perfectly. Now, please implement the final module from the architecture diagram: the AnalyticsSummary. Replace the [ Placeholder for AnalyticsSummary ] in the Dashboard. This component should read the data from HabitContext and display a simple weekly summary or basic charts showing how many habits were completed over the last 7 days."*

**AI Action:**
- Installed the `recharts` library.
- Built `AnalyticsSummary.jsx` to calculate data over the last 7 days from `HabitContext` and render a responsive Bar Chart.

**Result:** The application was successfully built component-by-component, ensuring strict adherence to the planned technical architecture. This approach allowed for easier debugging of isolated modules and a very clean, predictable codebase.
