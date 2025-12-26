# 🌱 GreenLedger

GreenLedger is a rule-based household sustainability accountability system.
It helps households track resource usage, detect inefficiencies, and understand environmental impact using transparent, deterministic rules — not AI and not predictions.

The system focuses on **clarity, explainability, and behavior correction**, not prediction.

---

## 🚀 Problem Statement

Most sustainability tools either:
- Overuse AI without transparency, or  
- Show raw data without actionable insights  

GreenLedger solves this by:
- Tracking monthly household resource usage
- Comparing usage against historical patterns and regional benchmarks
- Flagging inefficiencies using clear, explainable rules
- Estimating environmental impact via CO₂ calculations

---

## 🧠 Core Philosophy

> **No prediction. No guessing. Just evidence.**

All alerts are generated using deterministic rules, making them:
- Explainable
- Auditable
- Trustworthy

---

## ✨ Key Features

- 📊 Monthly usage tracking (Electricity, Water, Fuel, Waste)
- ⚠️ Rule-based inefficiency detection
- 🌍 CO₂ impact estimation
- 👨‍👩‍👧 Household-size-aware benchmarking
- 👥 Multi-user support
- 🧾 Historical alert visibility (no data rewriting)
- 🎯 Simple, action-oriented UI

---

## 🧩 Rule Engine

### 1️⃣ Spike Detection
Detects sudden month-over-month increases:
  current_month > previous_month × 1.15


### 2️⃣ Benchmark Violation
Detects usage beyond regional norms:
  current_usage > benchmark_average


All rules are deterministic, transparent, and explainable.

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- PostgreSQL (Neon)
- Prisma ORM

### Frontend
- React (Vite)
- Inline CSS (no UI libraries)

### Design Decisions
- Passwordless email-based demo login
- No AI/ML usage
- Focus on explainability over prediction

---

## 📁 Project Structure
```
GreenLedger/
├── .gitignore
├── Backend/
│   ├── package-lock.json
│   ├── package.json
│   ├── prisma/
│   │   ├── migrations/
│   │   │   ├── 20251225210104_init/
│   │   │   │   └── migration.sql
│   │   │   └── migration_lock.toml
│   │   ├── schema.prisma
│   │   └── seed.js
│   ├── prismaClient.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── dashboard.js
│   │   └── usage.js
│   ├── server.js
│   └── services/
│       ├── ruleEngine.js
│       └── scoreService.js
├── README.md
└── frontend/
    ├── .gitignore
    ├── README.md
    ├── package-lock.json
    ├── package.json
    ├── public/
    │   ├── favicon.ico
    │   ├── index.html
    │   ├── logo192.png
    │   ├── logo512.png
    │   ├── manifest.json
    │   └── robots.txt
    └── src/
        ├── App.css
        ├── App.js
        ├── App.test.js
        ├── api.js
        ├── components/
        │   ├── FlagsList.js
        │   └── UsageForm.js
        ├── index.css
        ├── index.js
        ├── logo.svg
        ├── main.js
        ├── pages/
        │   ├── AddUsage.js
        │   ├── Dashboard.js
        │   └── Login.js
        ├── reportWebVitals.js
        └── setupTests.js

```


---

## ▶️ How to Run the Project

### Backend Setup

```
cd backend
npm install
npx prisma generate
node prisma/seed.js
npm start
```


Backend runs on:

http://localhost:5001


###Frontend Setup

```
cd frontend
npm install
npm run dev
```

Backend runs on:

http://localhost:3000


<img width="1440" height="809" alt="Image" src="https://github.com/user-attachments/assets/7e4817e2-b243-40f9-a3f4-200396a032a9" />

The dashboard is intentionally minimal and focused on signal over noise.
###1️⃣ Total CO₂ Impact (Top KPI)
Displays cumulative CO₂ emissions
Calculated from recorded household usage
Uses fixed emission factors per resource
This is not a forecast.
It represents consequences of past behavior.


###2️⃣ Add Monthly Usage (Left Panel)
Users manually log:
Resource type (Electricity, Water, Fuel, Waste)
Month and year
Actual usage value
Important design choice:
No auto-fill
No estimation
No smoothing
This keeps the data auditable and honest.


###3️⃣ Inefficiency Alerts (Right Panel)
Alerts are generated when rules are violated.
Each alert includes:
Type (SPIKE, INEFFICIENCY)
Severity (LOW / MEDIUM / HIGH / CRITICAL)
Reason (plain-language explanation)
Alerts are not merged or hidden.
Repeated alerts indicate sustained inefficiency, not UI noise.



⚠️ How Alerts Are Generated
GreenLedger uses deterministic rules, such as:
Usage increase > X% month-over-month
Usage exceeds household-size-adjusted benchmark
Sustained inefficiency over multiple months
Example rule:
IF electricity usage > 1.25 × average of last 3 months
→ Generate SPIKE alert (HIGH severity)
No probabilities.
No confidence scores.
No black box.


🧩 System Architecture (Conceptual)
```
User Input
   ↓
Raw Usage Storage
   ↓
Rule Engine
   ↓
Flag Generation
   ↓
Dashboard Visualization
```


🛠️Tech Stack (Minimal & Intentional)
* Frontend: React
* Backend: Node.js
* Database: PostgreSQL
* ORM: Prisma

