export type Language = 'bn' | 'en';

export interface TranslationDictionary {
  [key: string]: {
    en: string;
    bn: string;
  };
}

export const translations: TranslationDictionary = {
  // Brand & Header
  app_name: { en: 'ShasthoSetu BD', bn: 'স্বাস্থ্যসেতু বিডি' },
  app_subname: { en: 'OpenHealthBD', bn: 'ওপেনহেলথ বিডি' },
  tagline: { en: "Bangladesh's Digital Healthcare & Medical Education Platform", bn: 'বাংলাদেশের আধুনিক ডিজিটাল স্বাস্থ্য ও চিকিৎসা শিক্ষা প্ল্যাটফর্ম' },
  welcome: { en: 'Welcome back', bn: 'স্বাগতম' },
  our_promise: { en: 'Your Health, Our Commitment', bn: 'আপনার স্বাস্থ্য, আমাদের অঙ্গীকার' },
  stay_safe: { en: 'Stay healthy, stay safe with digital care.', bn: 'সুস্থ থাকুন, ডিজিটাল সেবায় নিরাপদে থাকুন।' },
  search_placeholder: { en: 'Search doctors, specialties, medicines, lab tests...', bn: 'ডাক্তার, বিশেষজ্ঞ, ওষুধ ও পরীক্ষা খুঁজুন...' },

  // Navigation
  dashboard: { en: 'Dashboard', bn: 'ড্যাশবোর্ড' },
  landing_page: { en: 'Home & Overview', bn: 'পাবলিক হোম' },
  my_appointments: { en: 'Appointments', bn: 'আমার অ্যাপয়েন্টমেন্ট' },
  live_serial_tracker: { en: 'Live Serial Tracker', bn: 'লাইভ সিরিয়াল ট্র্যাকার' },
  e_prescriptions: { en: 'e-Prescriptions', bn: 'ই-প্রেসক্রিপশন' },
  reports_and_results: { en: 'Diagnostic Reports', bn: 'রিপোর্ট ও ফলাফল' },
  health_timeline: { en: 'Health Timeline', bn: 'স্বাস্থ্য টাইমলাইন' },
  medicine_price_index: { en: 'Medicine & Price Index', bn: 'ওষুধ ও মূল্য সূচক' },
  blood_network: { en: 'Blood Donation', bn: 'রক্তদান নেটওয়ার্ক' },
  bed_icu_directory: { en: 'Hospital Beds & ICU', bn: 'বেড ও ICU ডিরেক্টরি' },
  student_hub: { en: 'Medical Student Hub', bn: 'মেডিকেল শিক্ষার্থী হাব' },
  tv_display: { en: 'Waiting Room TV', bn: 'ওয়েটিং রুম টিভি ডিসপ্লে' },
  rx_builder: { en: 'Rapid Rx Builder', bn: 'প্রেসক্রিপশন বিল্ডার' },
  settings: { en: 'Settings & Profile', bn: 'সেটিংস ও প্রোফাইল' },

  // Roles
  role_patient: { en: 'Patient', bn: 'রোগী' },
  role_doctor: { en: 'Doctor', bn: 'চিকিৎসক' },
  role_student: { en: 'Student', bn: 'শিক্ষার্থী' },
  role_admin: { en: 'Admin', bn: 'অ্যাডমিন' },
  switch_role: { en: 'Switch Role', bn: 'ভূমিকা পরিবর্তন' },
  demo_accounts: { en: 'Demo Accounts', bn: 'ডেমো অ্যাকাউন্ট' },

  // Queue & Statuses
  live_badge: { en: 'LIVE', bn: 'লাইভ' },
  new_badge: { en: 'NEW', bn: 'নতুন' },
  in_chamber: { en: 'In Chamber', bn: 'চেম্বারে আছেন' },
  on_way: { en: 'On The Way', bn: 'পথে আছেন' },
  on_break: { en: 'On Break', bn: 'বিরতিতে' },
  emergency_duty: { en: 'Emergency Duty', bn: 'জরুরি ডিউটিতে' },
  current_serial: { en: 'Now Calling', bn: 'বর্তমান সিরিয়াল' },
  your_serial: { en: 'Your Serial', bn: 'আপনার সিরিয়াল' },
  est_wait: { en: 'Estimated Wait', bn: 'সম্ভাব্য সময়' },
  mins: { en: 'mins', bn: 'মিনিট' },
  people_ahead: { en: 'people ahead', bn: 'জন আগে আছেন' },
  advance_token: { en: 'Next Patient', bn: 'পরবর্তী রোগী' },
  call_token: { en: 'Call Token', bn: 'টোকেন ডাকুন' },
  total_tokens: { en: 'Total Bookings', bn: 'মোট বুকিং' },
  last_updated: { en: 'Updated', bn: 'আপডেট' },

  // Quick Action Buttons
  book_appointment: { en: 'Book Appointment', bn: 'অ্যাপয়েন্টমেন্ট নিন' },
  view_prescriptions: { en: 'e-Prescriptions', bn: 'ই-প্রেসক্রিপশন' },
  upload_report: { en: 'Upload Report', bn: 'রিপোর্ট আপলোড' },
  find_medicines: { en: 'Find Medicines', bn: 'ওষুধ খুঁজুন' },
  find_blood: { en: 'Find Blood Donor', bn: 'রক্তদাতা খুঁজুন' },
  find_beds: { en: 'Check Beds / ICU', bn: 'বেড ও আইসিইউ' },
  dose_calculator: { en: 'Dose Calculator', bn: 'ডোজ ক্যালকুলেটর' },
  emergency_sos: { en: 'Emergency SOS', bn: 'জরুরি হটলাইন' },

  // Controls & Popovers
  language: { en: 'Language', bn: 'ভাষা' },
  mode: { en: 'Display Mode', bn: 'প্রদর্শন মোড' },
  light: { en: 'Light', bn: 'দিন' },
  dark: { en: 'Dark', bn: 'রাত' },
  system: { en: 'System', bn: 'সিস্টেম' },
  colour_mood: { en: 'Colour Mood', bn: 'রঙের মুড' },
  colour_mood_desc: { en: 'Changes the active accent theme across the platform', bn: 'পুরো প্ল্যাটফর্মের অ্যাকসেন্ট ও থিমের রঙ পরিবর্তন করুন' },
  notifications: { en: 'Notifications', bn: 'বিজ্ঞপ্তি' },
  mark_all_read: { en: 'Mark all as read', bn: 'সব পঠিত করুন' },
  no_notifications: { en: 'No unread notifications', bn: 'নতুন কোনো বিজ্ঞপ্তি নেই' },
  profile: { en: 'My Profile', bn: 'আমার প্রোফাইল' },
  logout: { en: 'Log Out', bn: 'লগ আউট' },
  login: { en: 'Log In', bn: 'লগ ইন' },
  get_started: { en: 'Get Started', bn: 'শুরু করুন' },

  // Emergency & Helpline
  emergency_helpline: { en: 'Emergency Helpline', bn: 'জরুরি প্রয়োজনে' },
  helpline_24_7: { en: 'National Health 24/7', bn: 'স্বাস্থ্য বাতায়ন ২৪/৭' },
  helpline_number: { en: 'Dial 16263', bn: '১৬২৬৩ ডায়াল করুন' },
  emergency_999: { en: 'Police / Fire / Ambulance: 999', bn: 'জাতীয় জরুরি সেবা: ৯৯৯' },

  // Stats & Cards
  appointments_count: { en: 'Upcoming Visits', bn: 'আসন্ন ভিজিট' },
  prescriptions_count: { en: 'Prescriptions in Vault', bn: 'সংরক্ষিত প্রেসক্রিপশন' },
  reports_count: { en: 'Lab Test Reports', bn: 'ল্যাব টেস্ট রিপোর্ট' },
  health_tips: { en: 'Daily Health Tips', bn: 'স্বাস্থ্য বার্তা' },
  upcoming_visit: { en: 'Upcoming Doctor Consultation', bn: 'আসন্ন ডাক্তার অ্যাপয়েন্টমেন্ট' },
  chamber_room: { en: 'Room', bn: 'রুম' },
  view_details: { en: 'View Details', bn: 'বিস্তারিত দেখুন' },
  download_rx: { en: 'Download PDF', bn: 'পিডিএফ ডাউনলোড' },
  bmdc_verified: { en: 'BMDC Verified', bn: 'বিএমডিসি ভেরিফাইড' },
  free_followup: { en: 'Free Report Review Window', bn: 'ফ্রি রিপোর্ট প্রদর্শনের সময়' },
  days_left: { en: 'days remaining', bn: 'দিন বাকি আছে' },
};
