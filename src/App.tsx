import React, { Suspense, lazy } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { QueueProvider } from './context/QueueContext';

import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { LoginModal } from './components/auth/LoginModal';
import { RegisterModal } from './components/auth/RegisterModal';
import { EmergencySOS } from './components/common/EmergencySOS';

/*
 * Every route below is code-split. The landing page and the four role
 * dashboards are the only things most visitors ever load; pulling the
 * prescription builder, the QR encoder and the student hub into the initial
 * bundle made first paint slower for everyone on a rural 3G connection.
 */
const LandingPage = lazy(() => import('./components/landing/LandingPage').then((m) => ({ default: m.LandingPage })));

const PatientDashboard = lazy(() => import('./components/patient/PatientDashboard').then((m) => ({ default: m.PatientDashboard })));
const DoctorDashboard = lazy(() => import('./components/doctor/DoctorDashboard').then((m) => ({ default: m.DoctorDashboard })));
const StudentDashboard = lazy(() => import('./components/student/StudentDashboard').then((m) => ({ default: m.StudentDashboard })));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard').then((m) => ({ default: m.AdminDashboard })));

const AppointmentsPage = lazy(() => import('./components/pages/AppointmentsPage').then((m) => ({ default: m.AppointmentsPage })));
const LiveSerialPage = lazy(() => import('./components/pages/LiveSerialPage').then((m) => ({ default: m.LiveSerialPage })));
const PrescriptionsPage = lazy(() => import('./components/pages/PrescriptionsPage').then((m) => ({ default: m.PrescriptionsPage })));
const ReportsPage = lazy(() => import('./components/pages/ReportsPage').then((m) => ({ default: m.ReportsPage })));
const HealthTimelinePage = lazy(() => import('./components/pages/HealthTimelinePage').then((m) => ({ default: m.HealthTimelinePage })));
const MedicineIndexPage = lazy(() => import('./components/pages/MedicineIndexPage').then((m) => ({ default: m.MedicineIndexPage })));
const BloodBankPage = lazy(() => import('./components/pages/BloodBankPage').then((m) => ({ default: m.BloodBankPage })));
const BedDirectoryPage = lazy(() => import('./components/pages/BedDirectoryPage').then((m) => ({ default: m.BedDirectoryPage })));
const StudentHubPage = lazy(() => import('./components/pages/StudentHubPage').then((m) => ({ default: m.StudentHubPage })));
const RapidPrescriptionBuilderPage = lazy(() => import('./components/pages/RapidPrescriptionBuilderPage').then((m) => ({ default: m.RapidPrescriptionBuilderPage })));
const WaitingRoomTVPage = lazy(() => import('./components/pages/WaitingRoomTVPage').then((m) => ({ default: m.WaitingRoomTVPage })));
const SettingsPage = lazy(() => import('./components/pages/SettingsPage').then((m) => ({ default: m.SettingsPage })));

/** Shown while a lazily loaded route is fetched. */
const RouteFallback: React.FC = () => {
  const { tr } = useLanguage();
  return (
    <div className="flex items-center justify-center py-24" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
        <span className="text-xs text-muted font-medium">{tr('Loading…', 'লোড হচ্ছে…')}</span>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const { activeRole, activeView, setActiveView, selectedRxId, openPrescription } = useAuth();
  const { tr } = useLanguage();
  const goHome = () => setActiveView('dashboard');

  if (activeView === 'landing') {
    return (
      <>
        <Suspense fallback={<RouteFallback />}>
          <LandingPage
            onStartNow={goHome}
            onOpenLiveQueue={() => setActiveView('live_serial')}
            onOpenPrescriptions={() => setActiveView('prescriptions')}
            onOpenMedicines={() => setActiveView('medicines')}
            onOpenBloodBank={() => setActiveView('blood_bank')}
            onOpenBeds={() => setActiveView('beds')}
            onOpenStudentHub={() => setActiveView('student_hub')}
            onOpenForum={() => setActiveView('student_forum')}
          />
        </Suspense>
        <LoginModal />
        <RegisterModal />
        <EmergencySOS
          onOpenBeds={() => setActiveView('beds')}
          onOpenBloodBank={() => setActiveView('blood_bank')}
        />
      </>
    );
  }

  // Fullscreen TV mode renders on its own, without the app chrome.
  if (activeView === 'tv_display_fullscreen') {
    return (
      <Suspense fallback={<RouteFallback />}>
        <WaitingRoomTVPage onBack={goHome} />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-paper flex flex-col font-sans">
      <a href="#main-content" className="skip-link">
        {tr('Skip to main content', 'মূল বিষয়বস্তুতে যান')}
      </a>

      <Navbar onOpenSearch={() => setActiveView('medicines')} />

      <div className="flex-1 flex overflow-hidden">
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

        <main id="main-content" className="flex-1 overflow-y-auto bg-paper">
          <Suspense fallback={<RouteFallback />}>
            {activeView === 'dashboard' && (
              <>
                {activeRole === 'patient' && (
                  <PatientDashboard
                    onOpenLiveQueue={() => setActiveView('live_serial')}
                    onOpenPrescription={openPrescription}
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

                {activeRole === 'admin' && <AdminDashboard onOpenTVDisplay={() => setActiveView('tv_display')} />}
              </>
            )}

            {activeView === 'appointments' && (
              <AppointmentsPage onBack={goHome} onOpenLiveQueue={() => setActiveView('live_serial')} />
            )}

            {activeView === 'live_serial' && <LiveSerialPage onBack={goHome} />}

            {activeView === 'prescriptions' && (
              <PrescriptionsPage onBack={goHome} initialRxId={selectedRxId} />
            )}

            {activeView === 'reports' && <ReportsPage onBack={goHome} />}

            {activeView === 'health_timeline' && <HealthTimelinePage onBack={goHome} />}

            {activeView === 'medicines' && <MedicineIndexPage onBack={goHome} />}

            {activeView === 'blood_bank' && <BloodBankPage onBack={goHome} />}

            {activeView === 'beds' && <BedDirectoryPage onBack={goHome} />}

            {/* Student hub, opened on the tab the caller asked for. */}
            {(activeView === 'student_hub' || activeView === 'student_logbook') && (
              <StudentHubPage onBack={goHome} initialTab="logbook" />
            )}
            {activeView === 'student_osce' && <StudentHubPage onBack={goHome} initialTab="osce" />}
            {activeView === 'student_dose' && <StudentHubPage onBack={goHome} initialTab="dose" />}
            {activeView === 'student_quiz' && <StudentHubPage onBack={goHome} initialTab="quiz" />}
            {(activeView === 'student_forum' || activeView === 'forum') && (
              <StudentHubPage onBack={goHome} initialTab="forum" />
            )}

            {activeView === 'rx_builder' && <RapidPrescriptionBuilderPage onBack={goHome} />}

            {activeView === 'tv_display' && <WaitingRoomTVPage onBack={goHome} />}

            {activeView === 'settings' && <SettingsPage onBack={goHome} />}
          </Suspense>
        </main>
      </div>

      <LoginModal />
      <RegisterModal />

      {/* Hidden on the TV display, which is not an interactive surface. */}
      {activeView !== 'tv_display' && (
        <EmergencySOS
          onOpenBeds={() => setActiveView('beds')}
          onOpenBloodBank={() => setActiveView('blood_bank')}
        />
      )}
    </div>
  );
};

export const App: React.FC = () => (
  <ThemeProvider>
    <LanguageProvider>
      <AuthProvider>
        <QueueProvider>
          <AppContent />
        </QueueProvider>
      </AuthProvider>
    </LanguageProvider>
  </ThemeProvider>
);

export default App;
