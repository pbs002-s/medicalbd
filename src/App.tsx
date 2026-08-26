import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { QueueProvider } from './context/QueueContext';

import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { LandingPage } from './components/landing/LandingPage';
import { LoginModal } from './components/auth/LoginModal';
import { RegisterModal } from './components/auth/RegisterModal';

// Role Dashboards
import { PatientDashboard } from './components/patient/PatientDashboard';
import { DoctorDashboard } from './components/doctor/DoctorDashboard';
import { StudentDashboard } from './components/student/StudentDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';

// Standalone Individual Pages
import { AppointmentsPage } from './components/pages/AppointmentsPage';
import { LiveSerialPage } from './components/pages/LiveSerialPage';
import { PrescriptionsPage } from './components/pages/PrescriptionsPage';
import { ReportsPage } from './components/pages/ReportsPage';
import { HealthTimelinePage } from './components/pages/HealthTimelinePage';
import { MedicineIndexPage } from './components/pages/MedicineIndexPage';
import { BloodBankPage } from './components/pages/BloodBankPage';
import { BedDirectoryPage } from './components/pages/BedDirectoryPage';
import { StudentHubPage } from './components/pages/StudentHubPage';
import { RapidPrescriptionBuilderPage } from './components/pages/RapidPrescriptionBuilderPage';
import { WaitingRoomTVPage } from './components/pages/WaitingRoomTVPage';
import { SettingsPage } from './components/pages/SettingsPage';

// Quick Modal Dialogs
import { LiveSerialModal } from './components/patient/LiveSerialModal';
import { PrescriptionModal } from './components/patient/PrescriptionModal';
import { MedicineIndexModal } from './components/patient/MedicineIndexModal';
import { BloodBankModal } from './components/patient/BloodBankModal';
import { BedDirectoryModal } from './components/patient/BedDirectoryModal';
import { BookAppointmentModal } from './components/patient/BookAppointmentModal';
import { HealthTimelineModal } from './components/patient/HealthTimelineModal';
import { RapidPrescriptionBuilder } from './components/doctor/RapidPrescriptionBuilder';
import { WaitingRoomTVModal } from './components/admin/WaitingRoomTVModal';
import { CaseLogbookModal } from './components/student/CaseLogbookModal';
import { OSCEModal } from './components/student/OSCEModal';
import { PediatricDoseModal } from './components/student/PediatricDoseModal';
import { PostGradQuizModal } from './components/student/PostGradQuizModal';
import { ClinicalForumModal } from './components/student/ClinicalForumModal';

const AppContent: React.FC = () => {
  const { activeRole, activeView, setActiveView } = useAuth();

  // Modals state for quick launcher dialogs
  const [isLiveQueueOpen, setIsLiveQueueOpen] = useState(false);
  const [isPrescriptionOpen, setIsPrescriptionOpen] = useState(false);
  const [selectedRxId, setSelectedRxId] = useState<string | undefined>(undefined);
  const [isMedicineIndexOpen, setIsMedicineIndexOpen] = useState(false);
  const [isBloodBankOpen, setIsBloodBankOpen] = useState(false);
  const [isBedDirectoryOpen, setIsBedDirectoryOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isHealthTimelineOpen, setIsHealthTimelineOpen] = useState(false);

  const [isRxBuilderOpen, setIsRxBuilderOpen] = useState(false);
  const [isTVDisplayOpen, setIsTVDisplayOpen] = useState(false);

  const [isLogbookOpen, setIsLogbookOpen] = useState(false);
  const [isOSCEOpen, setIsOSCEOpen] = useState(false);
  const [isDoseCalcOpen, setIsDoseCalcOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isForumOpen, setIsForumOpen] = useState(false);

  const openPrescription = (id?: string) => {
    setSelectedRxId(id);
    setActiveView('prescriptions');
  };

  // If view is landing, render full landing page
  if (activeView === 'landing') {
    return (
      <>
        <LandingPage
          onStartNow={() => setActiveView('dashboard')}
          onOpenLiveQueue={() => setActiveView('live_serial')}
          onOpenPrescriptions={() => setActiveView('prescriptions')}
          onOpenMedicines={() => setActiveView('medicines')}
          onOpenBloodBank={() => setActiveView('blood_bank')}
          onOpenBeds={() => setActiveView('beds')}
          onOpenStudentHub={() => setActiveView('student_hub')}
          onOpenForum={() => setActiveView('student_forum')}
        />
        <LoginModal />
        <RegisterModal />
        <LiveSerialModal isOpen={isLiveQueueOpen} onClose={() => setIsLiveQueueOpen(false)} />
        <PrescriptionModal isOpen={isPrescriptionOpen} onClose={() => setIsPrescriptionOpen(false)} rxId={selectedRxId} />
        <MedicineIndexModal isOpen={isMedicineIndexOpen} onClose={() => setIsMedicineIndexOpen(false)} />
        <BloodBankModal isOpen={isBloodBankOpen} onClose={() => setIsBloodBankOpen(false)} />
        <BedDirectoryModal isOpen={isBedDirectoryOpen} onClose={() => setIsBedDirectoryOpen(false)} />
        <CaseLogbookModal isOpen={isLogbookOpen} onClose={() => setIsLogbookOpen(false)} />
        <ClinicalForumModal isOpen={isForumOpen} onClose={() => setIsForumOpen(false)} />
      </>
    );
  }

  // Full Screen TV Display Mode
  if (activeView === 'tv_display_fullscreen') {
    return <WaitingRoomTVPage onBack={() => setActiveView('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar onOpenSearch={() => setActiveView('medicines')} />

      {/* Main Dashboard Layout with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          onOpenLiveQueue={() => setActiveView('live_serial')}
          onOpenPrescriptions={() => setActiveView('prescriptions')}
          onOpenReports={() => setActiveView('reports')}
          onOpenAppointments={() => setActiveView('appointments')}
          onOpenMedicines={() => setActiveView('medicines')}
          onOpenBloodBank={() => setActiveView('blood_bank')}
          onOpenBeds={() => setActiveView('beds')}
          onOpenStudentHub={() => setActiveView('student_hub')}
          onOpenTVDisplay={() => setActiveView('tv_display')}
        />

        {/* Dynamic Center Main Area: Renders Dedicated Individual Pages */}
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC]">
          {/* 1. DASHBOARD VIEW (Role-based) */}
          {activeView === 'dashboard' && (
            <>
              {activeRole === 'patient' && (
                <PatientDashboard
                  onOpenLiveQueue={() => setActiveView('live_serial')}
                  onOpenPrescription={(id) => {
                    setSelectedRxId(id);
                    setActiveView('prescriptions');
                  }}
                  onOpenReports={() => setActiveView('reports')}
                  onOpenAppointmentBooking={() => setActiveView('appointments')}
                  onOpenMedicineIndex={() => setActiveView('medicines')}
                  onOpenBloodBank={() => setActiveView('blood_bank')}
                  onOpenBedDirectory={() => setActiveView('beds')}
                  onOpenStudentHub={() => setActiveView('student_hub')}
                  onOpenDoseCalc={() => setActiveView('student_dose')}
                />
              )}

              {activeRole === 'doctor' && (
                <DoctorDashboard
                  onOpenPrescriptionBuilder={() => setActiveView('rx_builder')}
                  onOpenTVDisplay={() => setActiveView('tv_display')}
                />
              )}

              {activeRole === 'student' && (
                <StudentDashboard
                  onOpenLogbook={() => setActiveView('student_logbook')}
                  onOpenOSCE={() => setActiveView('student_osce')}
                  onOpenDoseCalc={() => setActiveView('student_dose')}
                  onOpenQuiz={() => setActiveView('student_quiz')}
                  onOpenForum={() => setActiveView('student_forum')}
                />
              )}

              {activeRole === 'admin' && (
                <AdminDashboard onOpenTVDisplay={() => setActiveView('tv_display')} />
              )}
            </>
          )}

          {/* 2. DEDICATED INDIVIDUAL PAGES */}
          {activeView === 'appointments' && (
            <AppointmentsPage
              onBack={() => setActiveView('dashboard')}
              onOpenLiveQueue={() => setActiveView('live_serial')}
            />
          )}

          {activeView === 'live_serial' && (
            <LiveSerialPage onBack={() => setActiveView('dashboard')} />
          )}

          {activeView === 'prescriptions' && (
            <PrescriptionsPage
              onBack={() => setActiveView('dashboard')}
              initialRxId={selectedRxId}
            />
          )}

          {activeView === 'reports' && (
            <ReportsPage onBack={() => setActiveView('dashboard')} />
          )}

          {activeView === 'health_timeline' && (
            <HealthTimelinePage onBack={() => setActiveView('dashboard')} />
          )}

          {activeView === 'medicines' && (
            <MedicineIndexPage onBack={() => setActiveView('dashboard')} />
          )}

          {activeView === 'blood_bank' && (
            <BloodBankPage onBack={() => setActiveView('dashboard')} />
          )}

          {activeView === 'beds' && (
            <BedDirectoryPage onBack={() => setActiveView('dashboard')} />
          )}

          {/* Student Hub & Sub-modules */}
          {activeView === 'student_hub' && (
            <StudentHubPage onBack={() => setActiveView('dashboard')} initialTab="logbook" />
          )}
          {activeView === 'student_logbook' && (
            <StudentHubPage onBack={() => setActiveView('dashboard')} initialTab="logbook" />
          )}
          {activeView === 'student_osce' && (
            <StudentHubPage onBack={() => setActiveView('dashboard')} initialTab="osce" />
          )}
          {activeView === 'student_dose' && (
            <StudentHubPage onBack={() => setActiveView('dashboard')} initialTab="dose" />
          )}
          {activeView === 'student_quiz' && (
            <StudentHubPage onBack={() => setActiveView('dashboard')} initialTab="quiz" />
          )}
          {(activeView === 'student_forum' || activeView === 'forum') && (
            <StudentHubPage onBack={() => setActiveView('dashboard')} initialTab="forum" />
          )}

          {/* Doctor Rapid Rx Builder */}
          {activeView === 'rx_builder' && (
            <RapidPrescriptionBuilderPage onBack={() => setActiveView('dashboard')} />
          )}

          {/* Waiting Room TV */}
          {activeView === 'tv_display' && (
            <WaitingRoomTVPage onBack={() => setActiveView('dashboard')} />
          )}

          {/* Settings & Profile */}
          {activeView === 'settings' && (
            <SettingsPage onBack={() => setActiveView('dashboard')} />
          )}
        </main>
      </div>

      {/* Quick Action Modals & Dialogs */}
      <LoginModal />
      <RegisterModal />

      <LiveSerialModal isOpen={isLiveQueueOpen} onClose={() => setIsLiveQueueOpen(false)} />
      <PrescriptionModal isOpen={isPrescriptionOpen} onClose={() => setIsPrescriptionOpen(false)} rxId={selectedRxId} />
      <MedicineIndexModal isOpen={isMedicineIndexOpen} onClose={() => setIsMedicineIndexOpen(false)} />
      <BloodBankModal isOpen={isBloodBankOpen} onClose={() => setIsBloodBankOpen(false)} />
      <BedDirectoryModal isOpen={isBedDirectoryOpen} onClose={() => setIsBedDirectoryOpen(false)} />
      <BookAppointmentModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      <HealthTimelineModal isOpen={isHealthTimelineOpen} onClose={() => setIsHealthTimelineOpen(false)} />

      <RapidPrescriptionBuilder
        isOpen={isRxBuilderOpen}
        onClose={() => setIsRxBuilderOpen(false)}
        onSaved={() => setIsRxBuilderOpen(false)}
      />

      <WaitingRoomTVModal isOpen={isTVDisplayOpen} onClose={() => setIsTVDisplayOpen(false)} />

      <CaseLogbookModal isOpen={isLogbookOpen} onClose={() => setIsLogbookOpen(false)} />
      <OSCEModal isOpen={isOSCEOpen} onClose={() => setIsOSCEOpen(false)} />
      <PediatricDoseModal isOpen={isDoseCalcOpen} onClose={() => setIsDoseCalcOpen(false)} />
      <PostGradQuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
      <ClinicalForumModal isOpen={isForumOpen} onClose={() => setIsForumOpen(false)} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <QueueProvider>
          <AppContent />
        </QueueProvider>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;
