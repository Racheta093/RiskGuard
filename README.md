# 🛡️ RiskGuard – AI-Powered Enterprise Risk & Compliance Platform

RiskGuard is a full-stack AI-powered enterprise risk and compliance platform designed to help organizations identify, assess, monitor, and mitigate cybersecurity and operational risks.

The platform combines **AI-powered risk analysis, compliance assessment, risk scoring, role-based access control, audit trails, and real-time analytics** to provide organizations with a centralized view of their risk and compliance posture.

🔗 **Live Demo:** Coming Soon

---

## ✨ Features

* 🛡️ AI-powered enterprise risk identification and assessment
* 📊 Real-time risk and compliance dashboards
* 🔴 Risk severity classification and risk scoring
* 📋 Compliance control assessment
* 🤖 AI-generated risk explanations and remediation recommendations
* 📄 Policy and compliance document analysis
* 🔍 Evidence-backed risk identification
* 👥 Role-Based Access Control (RBAC)
* 🔐 JWT-based authentication and authorization
* 📝 Comprehensive audit logging
* 📈 Risk trends and compliance analytics
* 🚨 High-risk alerts and notifications
* 🔄 Risk lifecycle management
* 💬 AI-powered enterprise risk assistant
* 📱 Responsive enterprise dashboard
* 🚀 Cloud-ready architecture

---

## 🏗️ Architecture

```text
                    React.js Frontend
                           │
                           │ REST API
                           ▼
                  Node.js + Express.js
                           │
          ┌────────────────┼─────────────────┐
          │                │                 │
          ▼                ▼                 ▼
      MongoDB           Redis            Gemini API
          │                │                 │
          │                ▼                 │
          │        Background Jobs           │
          │                                  │
          └──────────────┬───────────────────┘
                         ▼
                Risk Analysis Engine
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
       Risk Assessment        Compliance Analysis
              │                     │
              └──────────┬──────────┘
                         ▼
                  Risk Dashboard
                         │
                         ▼
                 AI Recommendations
```

---

## 🧠 AI & Risk Analysis

RiskGuard uses AI to assist organizations in identifying potential risks and compliance gaps.

The AI analysis pipeline includes:

```text
Policy / Business Data
          │
          ▼
     Data Processing
          │
          ▼
    Context Extraction
          │
          ▼
      AI Analysis
          │
          ▼
    Risk Identification
          │
          ▼
   Severity Classification
          │
          ▼
     Risk Scoring
          │
          ▼
 Remediation Recommendation
```

Each identified risk can contain:

```text
Risk
├── Risk Category
├── Severity
├── Likelihood
├── Business Impact
├── Risk Score
├── Evidence
├── Recommendation
├── Owner
├── Status
└── Created / Updated Date
```

---

## 📊 Risk Scoring

RiskGuard provides a structured risk scoring mechanism based on **likelihood and business impact**.

```text
Risk Score = Likelihood × Impact
```

Example:

```text
Likelihood : 4 / 5
Impact     : 5 / 5

Risk Score : 20 / 25

Severity   : HIGH
```

The platform categorizes organizational risks into different severity levels to help teams prioritize remediation.

---

## 🔍 Compliance Assessment

Organizations can evaluate their current controls against defined compliance requirements.

Example:

```text
Compliance Control
──────────────────────────────────

Control:
Multi-factor authentication must
be enabled for privileged accounts.

Status:
❌ NON-COMPLIANT

Risk:
Unauthorized privileged access

Severity:
HIGH

Recommendation:
Implement mandatory MFA for
all privileged accounts.
```

The compliance dashboard provides an overall view of:

* Compliance percentage
* Passed controls
* Failed controls
* High-risk gaps
* Pending remediation
* Control status

---

## 📈 Risk Dashboard

The main dashboard provides an executive-level overview of the organization's risk posture.

```text
┌─────────────────────────────────────────────┐
│              RISK OVERVIEW                  │
├─────────────────────────────────────────────┤
│                                             │
│  Overall Risk Score          68 / 100       │
│  Compliance Score            82%             │
│  Critical Risks              4              │
│  High Risks                  12             │
│  Open Risks                  27             │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│        Risk Distribution                    │
│                                             │
│   Critical ███████                          │
│   High     █████████████                    │
│   Medium   █████████████████                │
│   Low      █████████████████████            │
│                                             │
└─────────────────────────────────────────────┘
```

The dashboard helps decision-makers understand where the organization should prioritize security and compliance efforts.

---

## 👥 Role-Based Access Control

RiskGuard provides role-specific access to enterprise functionality.

### Admin

* Manage users
* Manage roles
* Manage organization settings
* View all risks
* View audit logs

### Risk Manager

* Create and assess risks
* Assign risk owners
* Update risk status
* Review remediation actions

### Auditor

* Review compliance controls
* Examine evidence
* View audit history
* Generate compliance reports

### Employee

* View assigned risks
* Submit risk information
* Interact with the AI assistant

---

## 📝 Audit Trail

All important actions are recorded through an audit logging system.

Example:

```text
User: Risk Manager

Action:
Updated Risk #R-102

Previous Status:
OPEN

New Status:
IN PROGRESS

Timestamp:
2026-08-12 14:32:18
```

Audit logs help organizations maintain accountability and traceability across risk and compliance activities.

---

## 🛠 Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios
* React Router
* Recharts

### Backend

* Node.js
* Express.js
* MongoDB
* Redis
* JWT Authentication
* REST APIs

### AI

* Google Gemini API
* AI-powered risk analysis
* Risk classification
* Compliance analysis
* Automated recommendations

### Security

* JWT Authentication
* Role-Based Access Control
* Password hashing
* API authorization
* Audit logging
* Secure environment configuration

### Deployment

* Vercel
* Render / Railway
* MongoDB Atlas
* Redis Cloud

---

## ⚙️ Workflow

### Risk Assessment Workflow

1. User authenticates into the platform.
2. User submits organizational policy or risk information.
3. Backend validates and processes the submitted data.
4. AI analyzes the available context.
5. Potential risks are identified.
6. Each risk is classified by category and severity.
7. Likelihood and business impact are assessed.
8. A risk score is generated.
9. AI provides recommended remediation actions.
10. The risk is stored and displayed on the dashboard.
11. Risk owners can track and update its status.

### Compliance Workflow

1. Compliance controls are loaded into the system.
2. Organizational information is analyzed against the controls.
3. Controls are classified as compliant, partially compliant, or non-compliant.
4. Compliance gaps are identified.
5. Associated risks are generated.
6. Remediation recommendations are provided.
7. Compliance status is reflected on the dashboard.

---

## 📂 Project Structure

```text
RiskGuard/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── context/
│   │   └── ...
│   ├── public/
│   └── ...
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── workers/
│   │   ├── config/
│   │   └── utils/
│   └── ...
│
├── README.md
└── ...
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/Racheta093/RiskGuard.git
cd RiskGuard
```

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `server` directory.

```env
PORT=

MONGODB_URI=

REDIS_HOST=
REDIS_PORT=
REDIS_USERNAME=
REDIS_PASSWORD=

GEMINI_API_KEY=

JWT_SECRET=

CLIENT_URL=
```

---

## 📸 Screenshots

Add screenshots of the following modules:

* 🏠 Landing Page
* 📊 Risk Dashboard
* 🛡️ Risk Assessment
* 📋 Compliance Dashboard
* 🔍 Risk Details
* 🤖 AI Risk Assistant
* 👥 User & Role Management
* 📝 Audit Logs

---

## 🔮 Future Enhancements

* 📑 Automated compliance report generation
* 🌐 Integration with enterprise security platforms
* ☁️ Cloud infrastructure risk monitoring
* 🔔 Real-time email and Slack notifications
* 📊 Advanced risk forecasting
* 🤖 AI-powered remediation workflow automation
* 🔗 Integration with SIEM platforms
* 📡 Real-time security event monitoring
* 📈 Predictive enterprise risk analytics
* 🧩 Support for additional compliance frameworks
* 🐳 Containerized deployment with Docker
* ⚙️ CI/CD pipeline with GitHub Actions

---

## 🎯 Project Objectives

RiskGuard aims to:

* Automate repetitive risk assessment activities.
* Improve visibility into organizational risk.
* Identify potential cybersecurity and operational risks.
* Help organizations prioritize remediation efforts.
* Simplify compliance monitoring.
* Provide data-driven insights for enterprise decision-making.
* Improve traceability through audit logging.
* Demonstrate the application of AI in enterprise technology risk management.

---

## 👩‍💻 Author

**Racheta Prasad**

* GitHub: https://github.com/Racheta093
* LinkedIn: www.linkedin.com/in/racheta-prasad-495526380
```
```
