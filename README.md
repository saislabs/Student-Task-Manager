# STUDYFLOW AI — Smart Student Task & Study Management Platform
**Brand:** SAIS LABS  
**Product:** STUDYFLOW AI  
**Tagline:** Plan Smarter. Study Better. Achieve More.  
**Target Users:** College students, school students, project teams, and student hackathon participants.

---

## 🌟 Overview

**STUDYFLOW AI** is a production-ready, dark-navy themed student productivity workspace engineered specifically for academic excellence. It enables students to manage assignments, exams, projects, and daily study blocks in one seamless, high-performance interface.

The application is built with an **Offline-First, Zero-Database Architecture**: it deploys directly to **Vercel** with **zero required API keys**, no mandatory external database server, and zero configuration hurdles. All user tasks, subjects, calendar events, and productivity analytics are persisted safely in the browser's `localStorage` with versioned migrations, JSON backup export, and one-click JSON restore.

---

## ✨ Key Features

### 1. 📊 Interactive Dashboard Overview
- **Personalized Student Greeting:** Dynamic time-of-day greeting (e.g., *"Good morning, Surya! 👋"*), date indicator, and study status.
- **4 Glowing Metric Cards:**
  - **Total Tasks:** Real-time count of all tasks + completed today indicator.
  - **In Progress:** Active task count + percentage of total workload.
  - **Overdue:** Urgent countdown counter + red indicator when deadlines pass.
  - **Completion Rate:** SVG circular progress ring visualizing academic completion rate.
- **Today's Tasks Widget:** Instant checkbox completion toggle with celebratory confetti.
- **Weekly Schedule Strip:** 7-day calendar navigation strip with course timeline slots.
- **AI Study Planner Quick Widget:** Fast prompt launcher with sample study input.
- **Upcoming Deadlines:** Dynamic badges (*"2 days left"*, *"8 days left"*, *"16 days left"*).
- **Subject Progress Bars:** Real-time completion progress across all enrolled subjects.
- **Weekly Productivity Bar Chart:** Day-by-day study output visualization.

### 2. 📝 Full-Featured Task Management (CRUD)
- Create, view, edit, and delete tasks with confirmation dialogs.
- Categorize by **Assignment**, **Exam**, **Project**, **Reading**, **Revision**, **Lab**, or **General**.
- Prioritize by **Low**, **Medium**, **High**, or **Urgent** with distinctive color coding.
- Due date and time selectors with automatic overdue and countdown calculations.
- Search by title, description, or custom tags (`#sql`, `#paper`, `#hackathon`).
- Filter by status, priority, and subject; sort by due date, priority, or creation date.
- Seamless toggle between **List View** and **Card Grid View**.

### 3. 📅 Responsive Study Calendar & Daily Agenda
- Monthly calendar grid with previous/next month navigation and "Today" shortcut.
- Visual task dots and badges on their exact due dates.
- Today highlight ring and overdue alert markers.
- **Daily Agenda Panel:** Click any date to view all scheduled tasks for that day.
- Direct **"Add Task for this Day"** action on any selected date.
- Local date handling eliminating timezone offset issues.

### 4. 🧠 Intelligent Rule-Based AI Study Planner (Zero API Keys Required)
- **Deterministic Schedule Generator:** Input exam name, subject, remaining days (1–60), daily available study hours (0.5–14), topics, and session duration (30/45/60 mins).
- Outputs a realistic day-by-day plan with core study blocks, hands-on practice, formula recaps, mock tests, and cognitive rest recommendations.
- **Deadline Risk Detector:** Automatically flags high-urgency timelines when topic volume exceeds available hours.
- **One-Click Approval:** Add all generated sessions directly into **My Tasks** with calculated future due dates.
- **Project Subtask Breakdown:** Enter a goal like *"Build an AI-based college project and prepare a presentation"* to generate a checklist of actionable subtasks that can be individually selected and saved.

### 5. 📈 Academic Productivity Analytics (Recharts)
- Weekly productivity bar chart with completion percentages.
- Task status distribution donut chart (Completed vs. In Progress vs. Pending).
- Priority distribution horizontal bar chart (Urgent, High, Medium, Low).
- Subject-wise progress comparison bars.
- Total study hours planned vs. completed.

### 6. ⚙️ Workspace Preferences & Data Management
- Student display name and timezone configuration.
- Dark and Light theme toggle.
- Preferred study block duration (25m Pomodoro, 45m standard, 60m deep work).
- **Subject Manager:** Add, edit, and delete courses with customizable color pickers.
- **JSON Backup Export:** Download your entire workspace as a portable `.json` file.
- **JSON Restore:** Restore tasks from a previously saved backup file.
- **Demo Data Reset:** One-click button to load realistic student demo data for live workshop presentations.
- **Clear Workspace:** Secure option to wipe data with confirmation.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript (Strict Mode) |
| **Styling** | Tailwind CSS (Navy palette `#0B0F19`, violet/blue glowing accents) |
| **Icons** | Lucide React |
| **Forms & Validation** | React Hook Form + Zod |
| **Charts** | Recharts (ResponsiveContainer, BarChart, PieChart) |
| **Date Utilities** | date-fns |
| **Notifications** | Sonner toast notifications |
| **Celebrations** | canvas-confetti |
| **Testing** | Vitest + React Testing Library |
| **Storage** | Safe hydration-guarded LocalStorage with versioned migration |
| **Hosting** | Vercel |

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js `v18.17.0` or higher (tested with `v20` and `v24`)
- npm `v9` or higher

### 1. Installation
Clone or navigate to the project directory and install dependencies:
```bash
npm install
```

### 2. Development Server
Start the local Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 3. Run Tests
Execute the unit and integration test suite:
```bash
npm run test
```

### 4. Production Build
Verify the production build locally:
```bash
npm run build
npm run start
```

---

## 🚢 Deploying to Vercel (Zero Config)

STUDYFLOW AI is designed to deploy immediately to Vercel without requiring any environment variables or database setup.

### Step-by-Step Instructions:
1. **Initialize Git & Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "feat: initial release of StudyFlow AI by SAIS LABS"
   git branch -M main
   git remote add origin https://github.com/<your-username>/studyflow-ai.git
   git push -u origin main
   ```
2. **Import into Vercel:**
   - Log into [Vercel](https://vercel.com).
   - Click **"Add New..."** -> **"Project"**.
   - Select your `studyflow-ai` GitHub repository.
3. **Configure & Deploy:**
   - **Framework Preset:** Next.js (automatically detected).
   - **Root Directory:** `./`
   - **Environment Variables:** None required! (The application runs offline-first with full client-side persistence).
   - Click **"Deploy"**.
4. **Verification:**
   - Open your deployed URL (`https://studyflow-ai.vercel.app`).
   - Test creating a task, toggling complete, generating a study plan, viewing the calendar, and downloading a JSON backup.

---

## 🧪 Testing Coverage

The test suite covers:
- **Seed Data & Task Calculation:** Validates initial 12 realistic student tasks and dashboard metrics.
- **Deadline Countdown Logic:** Verifies overdue recognition and urgent countdown pills.
- **Priority Formatting:** Checks badge colors and contrast compliance.
- **Rule-Based AI Planner:** Verifies deterministic schedule allocation, revision block insertion, and deadline risk detection.
- **Subtask Breakdown:** Validates template parsing and goal deconstruction.
- **Zod Schema Validation:** Tests task and AI planner input boundaries.

---

## 🔒 Privacy & Data Policy

STUDYFLOW AI adheres strictly to student privacy principles:
- **Client-Side Ownership:** All task titles, notes, and schedules are stored solely within the student's browser storage.
- **No Third-Party Tracking:** No ad trackers, session recorders, or data brokers are integrated.
- **Zero Risk of Data Leaks:** Because tasks are stored locally and exportable on-demand, student information is completely under user control.

---

## 🎓 Built for SAIS LABS College Hackathon

Presented by **SAIS LABS** as a showcase of modern, accessible, and high-performance Web Engineering.
- **Tagline:** Plan Smarter. Study Better. Achieve More.
- **Product:** STUDYFLOW AI © 2026 SAIS LABS. All rights reserved.
