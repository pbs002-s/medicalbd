# 🩺 ShasthoSetu BD (OpenHealthBD)

> **Bangladesh's Modern Open-Source Digital Healthcare & Medical Education Platform**  
> *Bridging patients, doctors, medical students, and healthcare institutions with next-generation digital tools.*

[![React](https://img.shields.io/badge/React-18.x-blue.svg?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🌟 Overview

**ShasthoSetu BD (OpenHealthBD)** is a purpose-built healthcare web platform tailored to address the unique dynamics of Bangladesh's medical ecosystem. Designed to simplify clinical workflows, empower medical education, and streamline patient care, it connects key stakeholders in one cohesive, accessible application.

- **For Patients**: Real-time chamber serial tracking, lifetime digital e-prescription vault, diagnostic lab report manager, emergency blood donor network, and live hospital bed/ICU directory.
- **For Doctors**: Rapid 2-minute prescription builder adhering to BMDC standards, smart drug auto-complete, customizable dosage templates, and live chamber queue management.
- **For Medical Students**: Bedside clinical case logbook, 5-minute OSCE exam stations with interactive timer and marking checklists, weight-based pediatric dose calculator, FCPS-1 / Residency quiz bank, and peer clinical discussion forum.
- **For Hospitals & Clinics**: Large-screen, high-contrast Waiting Room TV display mode with real-time multi-chamber token broadcasts and automated voice announcements.

---

## 🚀 Key Modules & Features

### 1. ⏱️ Live Serial & Chamber Queue Tracker
- Real-time chamber serial counter with live pulse status and estimated wait time countdown.
- Natural Bengali & English voice announcements via `Web Speech API` (*e.g., "Serial number 12, please enter chamber"*).
- One-click token generation and printable queue slips for walk-in and booked patients.

### 2. 📄 Digital e-Prescription Vault
- Official Rx prescription layout compliant with BMDC and DGHS standards.
- Detailed dosage frequency (`1+0+1`), meal timings (Before / After meal), duration, instructions, and QR code verification.
- Instant print layout, PDF download, and permanent cloud-synced prescription history.

### 3. 🧪 Diagnostic Lab Reports & 14-Day Free Follow-up
- Centralized digital archive for diagnostic test reports (CBC, Lipid Profile, LFT, Creatinine, etc.).
- Visual reference range meters highlighting normal, high, or critical biomarker values.
- Automatic 14-day free doctor consultation review window countdown and reminder alerts.

### 4. 💊 DGDA Medicine Index & Generic Substitutes
- Comprehensive Directorate General of Drug Administration (DGDA) pharmaceutical database.
- Compare brand names, generic formulations, strengths, manufacturers, and Maximum Retail Prices (MRP).
- Cost-effective generic alternative recommendations and FDA pregnancy safety category alerts (A, B, C, D, X).

### 5. 🩸 Emergency Blood Donor Network
- Instant filtering by blood group (`A+`, `A-`, `B+`, `B-`, `O+`, `O-`, `AB+`, `AB-`) and geographic district.
- Verified donor status, 90-day donation cooldown tracking, and direct one-click calling.
- Real-time emergency blood broadcast feed for critical patient requirements.

### 6. 🛏️ Live Hospital Bed & ICU Directory
- Real-time bed availability tracking for General Wards, ICU, CCU, HDU, and NICU across public and private hospitals.
- District and hospital name search with direct emergency hotlines and National Shastho Batayan (`16263`) integration.

### 7. 🎓 Medical Student & Trainee Hub
- **Clinical Case Logbook**: Bedside history taking and systemic examination sheets for Medicine, Surgery, Gynae/Obs, and Pediatrics.
- **OSCE / OSPE Station Simulator**: 5-minute station countdown timer with structured marking checklists, procedural instructions, and high-yield viva Q&As.
- **Weight-Based Pediatric Dose Calculator**: Accurate `mg/kg/day` dosage calculation with automatic milliliter (ml) and spoon conversions.
- **Postgraduate Quiz Hub**: Comprehensive MCQs for FCPS Part-1, MD/MS Residency, and Diploma examinations with detailed clinical rationales.
- **Clinical Case Forum**: ECG strip interpretation, radiological image review, and peer discussions with senior clinicians.

### 8. 📺 Waiting Room TV Display Kiosk
- Fullscreen, high-contrast multi-chamber broadcast mode engineered for clinic waiting room TVs and monitors.
- Dynamic audible voice alerts and visual status updates for active tokens and incoming serials.

### 9. 🌓 Theme System & Dual-Language Support
- Full dark mode and light mode support with smooth transitions across all pages and modals.
- Instant bilingual toggle between **Bangla (বাংলা)** and **English** for user accessibility.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | React 18 with TypeScript |
| **Build Tool & Dev Server** | Vite 6 |
| **Styling & Design System** | Tailwind CSS 3, Custom CSS Design Tokens, Glassmorphism Effects |
| **Icons & Media** | Lucide React |
| **State & Context** | React Context API (`AuthContext`, `LanguageContext`, `QueueContext`, `ThemeContext`) |
| **Audio Engine** | Web Speech API (Voice Synthesis) |
| **Typography** | Inter, Hind Siliguri, Noto Sans Bengali |

---

## 📂 Project Structure

```text
medical/
├── public/                     # Static assets, logos, and audio files
├── src/
│   ├── components/
│   │   ├── admin/             # Admin dashboard & Waiting Room TV kiosk modal
│   │   ├── auth/              # Login and registration authentication modals
│   │   ├── common/            # BrandLogo, ScrollReveal, and shared UI primitives
│   │   ├── doctor/            # Doctor dashboard & Rapid Prescription Builder
│   │   ├── landing/           # Landing page, hero, feature showcases, and footer
│   │   ├── layout/            # Top Navbar, responsive sidebar, and role switchers
│   │   ├── pages/             # 12 dedicated standalone full-page views
│   │   │   ├── AppointmentsPage.tsx
│   │   │   ├── BedDirectoryPage.tsx
│   │   │   ├── BloodBankPage.tsx
│   │   │   ├── HealthTimelinePage.tsx
│   │   │   ├── LiveSerialPage.tsx
│   │   │   ├── MedicineIndexPage.tsx
│   │   │   ├── PrescriptionsPage.tsx
│   │   │   ├── RapidPrescriptionBuilderPage.tsx
│   │   │   ├── ReportsPage.tsx
│   │   │   ├── SettingsPage.tsx
│   │   │   ├── StudentHubPage.tsx
│   │   │   └── WaitingRoomTVPage.tsx
│   │   ├── patient/           # Patient dashboard & interactive service modals
│   │   └── student/           # Medical student portal & clinical tools modals
│   ├── context/               # Auth, Language, Queue, and Theme Context providers
│   ├── mockData.ts            # Realistic healthcare mock data (doctors, medicines, beds, etc.)
│   ├── types.ts               # Core TypeScript interfaces and type declarations
│   ├── index.css              # Global styles, animation keyframes, and theme variables
│   ├── App.tsx                # Central dynamic view router and layout orchestrator
│   └── main.tsx               # Application root entry point
├── OPENHEALTHBD_PLAN.md       # Architectural specifications and feature roadmap
├── package.json               # Project dependencies and npm scripts
├── tailwind.config.js         # Tailwind styling and dark mode configuration
├── tsconfig.json              # TypeScript compilation rules
└── vite.config.ts             # Vite bundler configuration
```

---

## 💻 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/pbs002-s/medicalbd.git
cd medicalbd
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```
Open your browser and navigate to: `http://localhost:3000/`

### 4. Build for Production
```bash
npm run build
```
To preview the production build locally:
```bash
npm run preview
```

---

## 👥 Demo User Roles

Switch instantly between roles using the role selector in the top-right navbar:

1. **👨‍💼 Patient**: Book appointments, track live serials, access the e-prescription vault, view lab reports, and manage health records.
2. **👨‍⚕️ Doctor**: Manage active chamber queues, call patients with voice announcements, and write prescriptions via the Rapid Builder.
3. **🎓 Medical Student**: Bedside case logbooks, timed OSCE station checklists, pediatric dose calculations, and postgraduate exam prep.
4. **🏥 Hospital Admin**: Chamber queue oversight, hospital bed occupancy status, and full-screen Waiting Room TV broadcast.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions, feedback, and feature suggestions are warmly welcomed!
- If you discover a bug, please submit an [Issue](https://github.com/pbs002-s/medicalbd/issues).
- For new features or improvements, feel free to fork the repository and submit a Pull Request.

---

*Developed with ❤️ for Bangladesh's Digital Health Ecosystem by **Pritom Biswas** & the OpenHealthBD Team.*