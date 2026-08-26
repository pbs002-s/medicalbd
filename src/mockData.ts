import { User, Appointment, Prescription, LabReport, MedicineItem, BloodDonor, HospitalBed, ClinicalCase, OSCEStation, PostGradQuestion } from './types';

export const mockUsers: Record<string, User> = {
  patient: {
    id: 'usr_pat_1',
    name: 'Salman Ahmed',
    nameBn: 'সালমান আহমেদ',
    email: 'salman@example.com',
    phone: '01712345678',
    role: 'patient',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    bloodGroup: 'B+',
    dateOfBirth: '1995-04-12',
    gender: 'Male',
    allergies: ['Penicillin', 'Sulfa drugs'],
    chronicDiseases: ['Hypertension', 'Mild Asthma']
  },
  doctor: {
    id: 'usr_doc_1',
    name: 'Dr. Tanvir Hasan',
    nameBn: 'ডা. তানভীর হাসান',
    email: 'tanvir.doc@example.com',
    phone: '01819876543',
    role: 'doctor',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&q=80',
    bmdcNumber: 'A-54982',
    specialty: 'Internal Medicine Specialist',
    specialtyBn: 'মেডিসিন বিশেষজ্ঞ',
    qualifications: 'MBBS (DMC), FCPS (Medicine), MACP (USA)',
    designation: 'Assistant Professor, Dept. of Medicine',
    hospital: 'Dhaka Medical College & Hospital',
    isBmdcVerified: true
  },
  student: {
    id: 'usr_stu_1',
    name: 'Ayan Chowdhury',
    nameBn: 'আয়ান চৌধুরী',
    email: 'ayan.med@example.com',
    phone: '01671122334',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
    medicalCollege: 'Dhaka Medical College (K-78)',
    sessionBatch: '2021-2022',
    studentPhase: 'Final Year MBBS (Clinical)',
    casesCount: 14
  },
  admin: {
    id: 'usr_adm_1',
    name: 'Dr. Rafiqul Islam',
    nameBn: 'ড. রফিকুল ইসলাম',
    email: 'admin@shasthosetu.gov.bd',
    phone: '01911223344',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  }
};

export const mockAppointments: Appointment[] = [
  {
    id: 'apt_101',
    patientName: 'Salman Ahmed',
    patientNameBn: 'সালমান আহমেদ',
    patientPhone: '01712345678',
    doctorId: 'usr_doc_1',
    doctorName: 'Dr. Tanvir Hasan',
    doctorNameBn: 'ডা. তানভীর হাসান',
    doctorSpecialty: 'Internal Medicine',
    doctorSpecialtyBn: 'মেডিসিন বিশেষজ্ঞ',
    doctorHospital: 'Labaid Diagnostic Centre, Dhanmondi',
    doctorHospitalBn: 'ল্যাবএইড ডায়াগনস্টিক সেন্টার, ধানমন্ডি',
    doctorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&q=80',
    date: '2026-05-20',
    dateBn: '২০ মে, ২০২৬',
    dayBn: 'মঙ্গলবার',
    time: '11:30 AM',
    timeBn: 'সকাল ১১:৩০',
    tokenNumber: 18,
    status: 'confirmed',
    statusBn: 'নিশ্চিত হয়েছে',
    chamberName: 'Room 304, Specialist Chamber',
    chamberAddress: 'House 01, Road 04, Dhanmondi, Dhaka',
    fee: 1200,
    isFollowUp: true,
    remainingFollowUpDays: 8
  },
  {
    id: 'apt_102',
    patientName: 'Salman Ahmed',
    patientNameBn: 'সালমান আহমেদ',
    patientPhone: '01712345678',
    doctorId: 'usr_doc_2',
    doctorName: 'Dr. Sayera Afreen',
    doctorNameBn: 'ডা. সায়রা আফরিন',
    doctorSpecialty: 'Cardiology Specialist',
    doctorSpecialtyBn: 'হৃদরোগ বিশেষজ্ঞ',
    doctorHospital: 'National Heart Foundation, Mirpur',
    doctorHospitalBn: 'ন্যাশনাল হার্ট ফাউন্ডেশন, মিরপুর',
    doctorAvatar: 'https://images.unsplash.com/photo-1594824813512-58e1c667088b?auto=format&fit=crop&w=150&q=80',
    date: '2026-05-26',
    dateBn: '২৬ মে, ২০২৬',
    dayBn: 'সোমবার',
    time: '06:00 PM',
    timeBn: 'সন্ধ্যা ০৬:০০',
    tokenNumber: 6,
    status: 'confirmed',
    statusBn: 'নিশ্চিত হয়েছে',
    chamberName: 'Square Hospital Specialist Chamber',
    chamberAddress: '18/F, Panthapath, Dhaka',
    fee: 1500,
    isFollowUp: false
  }
];

export const mockPrescriptions: Prescription[] = [
  {
    id: 'rx_001',
    prescriptionNumber: 'RX-BD-2026-8891',
    patientId: 'usr_pat_1',
    patientName: 'Salman Ahmed',
    patientNameBn: 'সালমান আহমেদ',
    patientAge: 31,
    patientGender: 'Male',
    date: '2026-05-16',
    dateBn: '১৬ মে, ২০২৬',
    doctorName: 'Dr. Tanvir Hasan',
    doctorNameBn: 'ডা. তানভীর হাসান',
    doctorDegrees: 'MBBS (DMC), FCPS (Medicine), MACP (USA)',
    doctorBmdc: 'BMDC Reg: A-54982',
    doctorHospital: 'Dhaka Medical College & Labaid Dhanmondi',
    chiefComplaints: [
      'Fever for 4 days (high-grade intermittent)',
      'Severe generalized headache and retro-orbital pain',
      'Body ache and joint pain'
    ],
    vitals: {
      bp: '120/80 mmHg',
      pulse: '84 bpm',
      temp: '101.4 °F',
      weight: '68 kg',
      spo2: '98%'
    },
    medicines: [
      {
        id: 'm1',
        brandName: 'Tab. Napa Extra',
        genericName: 'Paracetamol + Caffeine (500mg + 65mg)',
        strength: '565 mg',
        dosageForm: 'Tablet',
        frequency: '1+1+1+1',
        frequencyBn: '১+১+১+১',
        mealTiming: 'খাবার পরে (ভরা পেটে)',
        durationDays: 5,
        durationBn: '৫ দিন',
        specialInstruction: 'জ্বর ১০০.৫ এর বেশি হলে ১টি করে খাবেন'
      },
      {
        id: 'm2',
        brandName: 'Cap. Maxpro',
        genericName: 'Esomeprazole Magnesium Trihydrate',
        strength: '20 mg',
        dosageForm: 'Capsule',
        frequency: '1+0+1',
        frequencyBn: '১+০+১',
        mealTiming: 'খাবার ৩০ মিনিট আগে (খালি পেটে)',
        durationDays: 14,
        durationBn: '১৪ দিন'
      },
      {
        id: 'm3',
        brandName: 'Tab. Fexo',
        genericName: 'Fexofenadine Hydrochloride',
        strength: '120 mg',
        dosageForm: 'Tablet',
        frequency: '0+0+1',
        frequencyBn: '০+০+১',
        mealTiming: 'রাতে খাবার পর',
        durationDays: 7,
        durationBn: '৭ দিন'
      },
      {
        id: 'm4',
        brandName: 'Oral Saline (ORS-N)',
        genericName: 'Oral Rehydration Salts',
        strength: 'Standard sachet',
        dosageForm: 'Oral Solution',
        frequency: 'As needed',
        frequencyBn: 'প্রয়োজনে (SOS)',
        mealTiming: 'পর্যাপ্ত পানি ও স্যালাইন',
        durationDays: 5,
        durationBn: '৫ দিন'
      }
    ],
    investigations: [
      'CBC with ESR (Complete Blood Count)',
      'Dengue NS1 Antigen Test',
      'Serum Creatinine',
      'Urine R/M/E'
    ],
    adviceBn: [
      'প্রতিদিন কমপক্ষে ৩-৪ লিটার তরল খাবার (পানি, ডাবের পানি, ওরস্যালাইন) পান করুন।',
      'সম্পূর্ণ শারীরিক ও মানসিক বিশ্রামে থাকুন।',
      'কোনো প্রকার অ্যাসপিরিন বা ব্যথানাশক ঔষধ (NSAIDs) খাওয়া সম্পূর্ণ নিষেধ।',
      'মাড়ির রক্তপাত, কালো পায়খানা বা তীব্র পেট ব্যথা দেখা দিলে জরুরি হাসপাতালে যোগাযোগ করুন।'
    ],
    nextFollowUpBn: '৭ দিন পর রিপোর্টসহ ফ্রি রিভিউ চেম্বারে আসবেন'
  },
  {
    id: 'rx_002',
    prescriptionNumber: 'RX-BD-2026-7742',
    patientId: 'usr_pat_1',
    patientName: 'Salman Ahmed',
    patientNameBn: 'সালমান আহমেদ',
    patientAge: 31,
    patientGender: 'Male',
    date: '2026-05-06',
    dateBn: '০৬ মে, ২০২৬',
    doctorName: 'Dr. Sayera Afreen',
    doctorNameBn: 'ডা. সায়রা আফরিন',
    doctorDegrees: 'MBBS, MD (Cardiology), FCPS',
    doctorBmdc: 'BMDC Reg: A-43210',
    doctorHospital: 'National Heart Foundation',
    chiefComplaints: ['Occasional chest heaviness during exertion', 'Fatigue'],
    vitals: {
      bp: '135/85 mmHg',
      pulse: '76 bpm',
      temp: '98.4 °F',
      weight: '68 kg'
    },
    medicines: [
      {
        id: 'm10',
        brandName: 'Tab. Bislol',
        genericName: 'Bisoprolol Fumarate',
        strength: '2.5 mg',
        dosageForm: 'Tablet',
        frequency: '1+0+0',
        frequencyBn: '১+০+০',
        mealTiming: 'সকালে খাবার পর',
        durationDays: 30,
        durationBn: '১ মাস'
      }
    ],
    investigations: ['ECG (12 Leads)', 'Echocardiogram', 'Lipid Profile', 'Serum Electrolytes'],
    adviceBn: ['লবণ পরিহার করুন', 'প্রতিদিন ৩০ মিনিট সকালের হাঁটা অভ্যাস করুন'],
    nextFollowUpBn: '১ মাস পর ফলোআপ'
  },
  {
    id: 'rx_003',
    prescriptionNumber: 'RX-BD-2026-6512',
    patientId: 'usr_pat_1',
    patientName: 'Salman Ahmed',
    patientNameBn: 'সালমান আহমেদ',
    patientAge: 31,
    patientGender: 'Male',
    date: '2026-04-20',
    dateBn: '২০ এপ্রিল, ২০২৬',
    doctorName: 'Dr. Rakibul Islam',
    doctorNameBn: 'ডা. রাকিবুল ইসলাম',
    doctorDegrees: 'MBBS, DDV, FCPS (Dermatology)',
    doctorBmdc: 'BMDC Reg: A-61294',
    doctorHospital: 'BSMMU (PG Hospital)',
    chiefComplaints: ['Skin allergic rash', 'Itching on arms'],
    vitals: { bp: '120/80 mmHg', pulse: '72 bpm', temp: '98.6 °F', weight: '68 kg' },
    medicines: [
      {
        id: 'm20',
        brandName: 'Tab. Bilashin',
        genericName: 'Bilastine',
        strength: '20 mg',
        dosageForm: 'Tablet',
        frequency: '0+0+1',
        frequencyBn: '০+০+১',
        mealTiming: 'রাতে খাবার ১ ঘণ্টা আগে',
        durationDays: 14,
        durationBn: '১৪ দিন'
      }
    ],
    investigations: ['IgE Level', 'Skin Prick Test (Optional)'],
    adviceBn: ['ধুলাবালি ও এলার্জিক খাদ্য এড়িয়ে চলুন'],
    nextFollowUpBn: 'প্রয়োজনে ১৪ দিন পর'
  }
];

export const mockLabReports: LabReport[] = [
  {
    id: 'rep_01',
    testName: 'CBC (Complete Blood Count)',
    date: '2026-05-18',
    dateBn: '১৮ মে, ২০২৬',
    labName: 'Labaid Diagnostic Center',
    status: 'normal',
    statusBn: 'স্বাভাবিক',
    resultValue: 'Hb: 14.2 g/dL, Platelet: 185,000/uL, WBC: 6,200/uL',
    referenceRange: 'Hb: 13-17 g/dL, Platelet: 150k-450k/uL'
  },
  {
    id: 'rep_02',
    testName: 'Serum Vitamin D (25-OH)',
    date: '2026-05-10',
    dateBn: '১০ মে, ২০২৬',
    labName: 'Popular Diagnostic Centre',
    status: 'low',
    statusBn: 'কম (Low)',
    resultValue: '16.4 ng/mL',
    referenceRange: 'Normal: 30 - 100 ng/mL'
  },
  {
    id: 'rep_03',
    testName: 'ECG Report (12 Lead)',
    date: '2026-05-08',
    dateBn: '০৮ মে, ২০২৬',
    labName: 'National Heart Foundation',
    status: 'normal',
    statusBn: 'স্বাভাবিক',
    resultValue: 'Normal Sinus Rhythm, HR 76 bpm, No ST-T changes'
  },
  {
    id: 'rep_04',
    testName: 'Serum Creatinine',
    date: '2026-04-25',
    dateBn: '২৫ এপ্রিল, ২০২৬',
    labName: 'Ibn Sina Diagnostic',
    status: 'normal',
    statusBn: 'স্বাভাবিক',
    resultValue: '0.9 mg/dL',
    referenceRange: '0.6 - 1.2 mg/dL'
  }
];

export const mockMedicines: MedicineItem[] = [
  {
    id: 'med_1',
    brandName: 'Napa Extra',
    genericName: 'Paracetamol + Caffeine',
    dosageForm: 'Tablet',
    strength: '500mg + 65mg',
    company: 'Beximco Pharmaceuticals Ltd.',
    mrpPrice: 3.00,
    pregnancyCategory: 'Category B',
    indication: 'Fever, headache, body aches, toothache, migraine',
    alternativeBrands: [
      { brandName: 'Ace Plus', company: 'Square Pharmaceuticals Ltd.', price: 3.00 },
      { brandName: 'Fast Plus', company: 'Acme Laboratories Ltd.', price: 3.00 },
      { brandName: 'Pyrex Plus', company: 'Incepta Pharmaceuticals Ltd.', price: 2.75 }
    ]
  },
  {
    id: 'med_2',
    brandName: 'Maxpro 20',
    genericName: 'Esomeprazole Magnesium Trihydrate',
    dosageForm: 'Capsule / Tablet',
    strength: '20 mg',
    company: 'Renata Limited',
    mrpPrice: 8.00,
    pregnancyCategory: 'Category B',
    indication: 'GERD, peptic ulcer, acid reflux, gastritis',
    alternativeBrands: [
      { brandName: 'Seclo 20', company: 'Square Pharmaceuticals Ltd.', price: 7.00 },
      { brandName: 'Sergel 20', company: 'Healthcare Pharmaceuticals Ltd.', price: 8.00 },
      { brandName: 'Pantonix 20', company: 'Incepta Pharmaceuticals Ltd.', price: 7.00 },
      { brandName: 'Proceptin 20', company: 'Beximco Pharmaceuticals Ltd.', price: 8.00 }
    ]
  },
  {
    id: 'med_3',
    brandName: 'Monas 10',
    genericName: 'Montelukast Sodium',
    dosageForm: 'Chewable / Film-coated Tablet',
    strength: '10 mg',
    company: 'Acme Laboratories Ltd.',
    mrpPrice: 16.00,
    pregnancyCategory: 'Category B',
    indication: 'Asthma, allergic rhinitis, bronchospasm prophylaxis',
    alternativeBrands: [
      { brandName: 'Montene 10', company: 'Square Pharmaceuticals Ltd.', price: 16.00 },
      { brandName: 'Odmon 10', company: 'Incepta Pharmaceuticals Ltd.', price: 15.00 },
      { brandName: 'Lumona 10', company: 'Beximco Pharmaceuticals Ltd.', price: 16.00 }
    ]
  },
  {
    id: 'med_4',
    brandName: 'Fexo 120',
    genericName: 'Fexofenadine Hydrochloride',
    dosageForm: 'Tablet',
    strength: '120 mg',
    company: 'Square Pharmaceuticals Ltd.',
    mrpPrice: 10.00,
    pregnancyCategory: 'Category C',
    indication: 'Seasonal allergic rhinitis, chronic urticaria, itchy rash',
    alternativeBrands: [
      { brandName: 'Rhinil 120', company: 'Incepta Pharmaceuticals Ltd.', price: 9.50 },
      { brandName: 'Alarid 120', company: 'Beximco Pharmaceuticals Ltd.', price: 10.00 },
      { brandName: 'Fexast 120', company: 'Renata Limited', price: 10.00 }
    ]
  },
  {
    id: 'med_5',
    brandName: 'Cef-3 200',
    genericName: 'Cefixime Trihydrate',
    dosageForm: 'Capsule',
    strength: '200 mg',
    company: 'Square Pharmaceuticals Ltd.',
    mrpPrice: 40.00,
    pregnancyCategory: 'Category B',
    indication: 'Typhoid fever, UTI, respiratory tract infection',
    alternativeBrands: [
      { brandName: 'Denvar 200', company: 'Incepta Pharmaceuticals Ltd.', price: 38.00 },
      { brandName: 'Orfix 200', company: 'Beximco Pharmaceuticals Ltd.', price: 40.00 },
      { brandName: 'Triocim 200', company: 'Renata Limited', price: 38.00 }
    ]
  }
];

export const mockBloodDonors: BloodDonor[] = [
  {
    id: 'bd_1',
    name: 'Tanvir Hossain',
    bloodGroup: 'B+',
    district: 'Dhaka',
    districtBn: 'ঢাকা',
    upazila: 'Dhanmondi',
    upazilaBn: 'ধানমন্ডি',
    phone: '01711998877',
    lastDonationDate: '2026-01-15',
    isAvailable: true,
    cooldownDaysRemaining: 0,
    totalDonations: 7
  },
  {
    id: 'bd_2',
    name: 'Sabbir Rahman',
    bloodGroup: 'O+',
    district: 'Dhaka',
    districtBn: 'ঢাকা',
    upazila: 'Mirpur',
    upazilaBn: 'মিরপুর',
    phone: '01822334455',
    lastDonationDate: '2026-05-02',
    isAvailable: false,
    cooldownDaysRemaining: 74,
    totalDonations: 4
  },
  {
    id: 'bd_3',
    name: 'Nusrat Jahan',
    bloodGroup: 'O-',
    district: 'Dhaka',
    districtBn: 'ঢাকা',
    upazila: 'Uttara',
    upazilaBn: 'উত্তরা',
    phone: '01933445566',
    lastDonationDate: '2025-11-20',
    isAvailable: true,
    cooldownDaysRemaining: 0,
    totalDonations: 5
  },
  {
    id: 'bd_4',
    name: 'Mahmudul Hasan',
    bloodGroup: 'A+',
    district: 'Chittagong',
    districtBn: 'চট্টগ্রাম',
    upazila: 'Panchlaish',
    upazilaBn: 'পাঁচলাইশ',
    phone: '01644556677',
    lastDonationDate: '2026-02-01',
    isAvailable: true,
    cooldownDaysRemaining: 0,
    totalDonations: 9
  },
  {
    id: 'bd_5',
    name: 'Farhan Kabir',
    bloodGroup: 'AB+',
    district: 'Sylhet',
    districtBn: 'সিলেট',
    upazila: 'Amberkhana',
    upazilaBn: 'আম্বরখানা',
    phone: '01755667788',
    lastDonationDate: '2026-01-10',
    isAvailable: true,
    cooldownDaysRemaining: 0,
    totalDonations: 3
  }
];

export const mockHospitalBeds: HospitalBed[] = [
  {
    id: 'bed_1',
    hospitalName: 'Dhaka Medical College & Hospital (DMCH)',
    hospitalNameBn: 'ঢাকা মেডিকেল কলেজ হাসপাতাল',
    district: 'Dhaka',
    districtBn: 'ঢাকা',
    address: 'Secretariat Road, Ramna, Dhaka',
    phone: '02-55165088',
    generalBeds: { total: 2200, available: 142 },
    icuBeds: { total: 32, available: 3 },
    ccuBeds: { total: 18, available: 2 },
    nicuBeds: { total: 24, available: 1 },
    updatedTime: '১০ মিনিট আগে'
  },
  {
    id: 'bed_2',
    hospitalName: 'BSMMU (PG Hospital)',
    hospitalNameBn: 'বঙ্গবন্ধু শেখ মুজিব মেডিকেল বিশ্ববিদ্যালয়',
    district: 'Dhaka',
    districtBn: 'ঢাকা',
    address: 'Shahbag, Dhaka-1000',
    phone: '02-9661051',
    generalBeds: { total: 1800, available: 89 },
    icuBeds: { total: 28, available: 4 },
    ccuBeds: { total: 16, available: 3 },
    nicuBeds: { total: 20, available: 2 },
    updatedTime: '১৫ মিনিট আগে'
  },
  {
    id: 'bed_3',
    hospitalName: 'Square Hospital Ltd.',
    hospitalNameBn: 'স্কয়ার হাসপাতাল লি.',
    district: 'Dhaka',
    districtBn: 'ঢাকা',
    address: '18/F, Bir Uttam Qazi Nuruzzaman Sarak, Panthapath, Dhaka',
    phone: '10616',
    generalBeds: { total: 400, available: 34 },
    icuBeds: { total: 45, available: 6 },
    ccuBeds: { total: 20, available: 4 },
    nicuBeds: { total: 18, available: 3 },
    updatedTime: '৫ মিনিট আগে'
  },
  {
    id: 'bed_4',
    hospitalName: 'Chittagong Medical College Hospital (CMCH)',
    hospitalNameBn: 'চট্টগ্রাম মেডিকেল কলেজ হাসপাতাল',
    district: 'Chittagong',
    districtBn: 'চট্টগ্রাম',
    address: '57 K.B. Fazlul Kader Road, Chittagong',
    phone: '031-616380',
    generalBeds: { total: 1300, available: 76 },
    icuBeds: { total: 24, available: 2 },
    ccuBeds: { total: 12, available: 1 },
    nicuBeds: { total: 16, available: 0 },
    updatedTime: '২০ মিনিট আগে'
  }
];

export const mockClinicalCases: ClinicalCase[] = [
  {
    id: 'case_01',
    title: 'A 28-year-old male with Acute High-Grade Fever and Retro-orbital Pain (Dengue with Warning Signs)',
    department: 'Internal Medicine (Ward 1, DMCH)',
    patientAgeGender: '28 Y / Male',
    chiefComplaint: 'High-grade continuous fever for 4 days, severe retro-orbital headache, body ache and persistent vomiting',
    hpi: 'Patient was reasonably well 4 days back. Then he developed sudden high fever (103°F) accompanied by chills, severe retro-orbital headache and intense musculoskeletal pain (break-bone fever). Since yesterday, he noticed abdominal pain and 3 episodes of persistent vomiting.',
    generalExam: {
      anemia: 'Mild',
      jaundice: 'Absent',
      cyanosis: 'Absent',
      clubbing: 'Absent',
      edema: 'Absent',
      pulse: '98 bpm (regular, good volume)',
      bp: '110/70 mmHg'
    },
    systemicExam: 'Abdomen: Mild right hypochondriac tenderness, no organomegaly or ascites. Chest: Bilateral vesicular breath sounds, no pleural effusion.',
    differentialDiagnosis: [
      'Dengue Fever with Warning Signs (Most Likely)',
      'Enteric Fever (Typhoid)',
      'Malaria (P. vivax / falciparum)',
      'Acute Viral Hepatitis (prodromal phase)'
    ],
    investigationPlan: [
      'CBC with Hematocrit (HCT) serial monitoring',
      'Dengue NS1 Antigen (Day 1-5) / IgM (Day 5+)',
      'Serum AST, ALT, Albumin',
      'Ultrasonography of Whole Abdomen (Gallbladder wall edema, ascites)'
    ],
    treatmentPlan: [
      'Strict bed rest and fluid intake calculation (Maintenance + Deficit: Normal Saline / Hartman solution)',
      'Tab. Paracetamol 500mg (Max 4g/24hr) for fever (Avoid NSAIDs)',
      'Monitor warning signs: BP, Pulse pressure (<20 mmHg = shock), Urine output (>0.5 ml/kg/hr), HCT rise >20%'
    ],
    authorStudent: 'Ayan Chowdhury (K-78, DMCH)',
    verifiedByDoctor: 'Dr. Tanvir Hasan (FCPS)',
    likesCount: 38
  },
  {
    id: 'case_02',
    title: 'A 22-year-old female with Acute Right Lower Abdominal Pain (Acute Appendicitis)',
    department: 'General Surgery (Ward 7, DMCH)',
    patientAgeGender: '22 Y / Female',
    chiefComplaint: 'Severe abdominal pain initially around umbilicus, now shifted to right iliac fossa for 18 hours',
    hpi: 'Pain started as periumbilical visceral colic, then after 6 hours localized to right lower quadrant (somatic pain). Aggravated by coughing and movement, accompanied by anorexia and low-grade fever.',
    generalExam: {
      anemia: 'Absent',
      jaundice: 'Absent',
      cyanosis: 'Absent',
      clubbing: 'Absent',
      edema: 'Absent',
      pulse: '104 bpm',
      bp: '115/75 mmHg'
    },
    systemicExam: 'Per Abdomen: Tenderness & guarding at McBurney\'s point, positive Rovsing\'s sign, positive Psoas sign, rebound tenderness positive.',
    differentialDiagnosis: [
      'Acute Appendicitis (Alvarado score: 8/10)',
      'Ruptured Ovarian Cyst',
      'Acute Salpingitis / Pelvic Inflammatory Disease (PID)',
      'Right Ureteric Colic'
    ],
    investigationPlan: [
      'CBC (Leukocytosis with neutrophilia >80%)',
      'USG of lower abdomen & pelvis (Non-compressible appendix >6mm)',
      'Urine R/M/E & Pregnancy test (Urine beta-hCG to rule out ectopic)'
    ],
    treatmentPlan: [
      'Keep NPO (Nil per mouth), start IV fluids (DNS)',
      'IV Antibiotics: Ceftriaxone 1g + Metronidazole 500mg IV',
      'Prepare for emergency Open or Laparoscopic Appendectomy'
    ],
    authorStudent: 'Zubair Hossain (SSMC)',
    verifiedByDoctor: 'Prof. Dr. M. A. Jalil (MS Surgery)',
    likesCount: 29
  }
];

export const mockOSCEStations: OSCEStation[] = [
  {
    id: 'osce_01',
    title: 'Cardiovascular System (CVS) Clinical Examination',
    system: 'CVS (Medicine / Cardiology)',
    timeLimitMinutes: 5,
    scenario: 'A 45-year-old male with exertional shortness of breath is in bed. Perform a focused Precordial Examination.',
    checklistItems: [
      { id: 'c1', text: 'Greet the patient, introduce yourself, take verbal consent, and ensure proper exposure (chest exposed to waist) with privacy.', marks: 1 },
      { id: 'c2', text: 'Inspect precordium: Look for surgical scars (sternotomy), visible pulsations, chest deformities (pectus excavatum/carinatum).', marks: 1.5 },
      { id: 'c3', text: 'Palpate the Apex Beat: Locate exact intercostal space (5th ICS, left mid-clavicular line) and characterize (tapping, heaving, thrusting).', marks: 2 },
      { id: 'c4', text: 'Palpate for Left Parasternal Heave (Right ventricular hypertrophy) and Thrills at mitral, aortic, pulmonary, and tricuspid areas.', marks: 1.5 },
      { id: 'c5', text: 'Auscultate all 4 valvular areas with diaphragm: Mitral, Tricuspid, Pulmonary, Aortic areas (listen to S1, S2, added sounds).', marks: 2 },
      { id: 'c6', text: 'Listen with bell at apex in left lateral position for mid-diastolic murmur of Mitral Stenosis (MS) and axillary radiation for MR.', marks: 1 },
      { id: 'c7', text: 'Thank the patient, help them get dressed, and state your clinical findings cleanly to the examiner.', marks: 1 }
    ],
    vivaQuestions: [
      {
        question: 'What are the causes of an Apex Beat displaced downwards and laterally?',
        answer: 'Left ventricular enlargement/dilatation (e.g. Aortic Regurgitation, Dilated Cardiomyopathy, severe MR, systemic hypertension).'
      },
      {
        question: 'What is a Parasternal Heave and how do you palpate it?',
        answer: 'Felt with the heel of the right hand placed flat over the left parasternal area (3rd and 4th ICS). Indicates Right Ventricular Hypertrophy.'
      }
    ]
  },
  {
    id: 'osce_02',
    title: 'Abdominal Examination: Palpation of Liver and Spleen',
    system: 'Gastroenterology / General Medicine',
    timeLimitMinutes: 5,
    scenario: 'Patient presents with fullness in abdomen. Perform focused palpation for hepatomegaly and splenomegaly.',
    checklistItems: [
      { id: 'a1', text: 'Position patient completely flat with a single pillow under head, hands by the side, knees semi-flexed.', marks: 1 },
      { id: 'a2', text: 'Warm your hands, ask the patient if they have pain anywhere in the abdomen before touching.', marks: 1 },
      { id: 'a3', text: 'Palpate for Liver: Start from Right Iliac Fossa (RIF), moving upwards on deep inspiration towards the right costal margin.', marks: 2 },
      { id: 'a4', text: 'Measure liver span by percussing upper border from 2nd ICS downwards, and note lower edge consistency (soft, firm, nodular, tender).', marks: 2 },
      { id: 'a5', text: 'Palpate for Spleen: Start from Right Iliac Fossa diagonally towards Left Hypochondrium; check for splenic notch.', marks: 2 },
      { id: 'a6', text: 'Turn patient to right lateral position if spleen is not palpable in supine position (Bimanual palpation).', marks: 1 },
      { id: 'a7', text: 'Present findings confidently to the examiner.', marks: 1 }
    ],
    vivaQuestions: [
      {
        question: 'How do you clinically distinguish an enlarged Spleen from a Left Kidney mass?',
        answer: 'Spleen has a palpable splenic notch, moves diagonally with respiration towards RIF, you cannot get above it, it is dull to percussion (no overlying resonance), and it is NOT bimanually ballotable.'
      }
    ]
  }
];

export const mockPostGradQuestions: PostGradQuestion[] = [
  {
    id: 'q_01',
    examType: 'FCPS-1',
    subject: 'Pharmacology',
    question: 'Which of the following NSAIDs is contraindicated in a suspected patient of Dengue Fever during the febrile phase?',
    options: [
      'Paracetamol',
      'Ketorolac / Ibuprofen',
      'Fexofenadine',
      'Omeprazole',
      'Domperidone'
    ],
    correctOptionIndex: 1,
    explanation: 'Ketorolac, Ibuprofen, Aspirin and all traditional NSAIDs cause platelet dysfunction and gastric mucosal erosion, dramatically increasing the danger of catastrophic internal hemorrhage in dengue with thrombocytopenia. Only Paracetamol is safe within prescribed daily limits.'
  },
  {
    id: 'q_02',
    examType: 'Residency MD/MS',
    subject: 'Physiology & Cardiology',
    question: 'The primary pacemaker of the human heart is the SA node because it has:',
    options: [
      'The highest resting membrane potential',
      'The steepest phase 4 spontaneous diastolic depolarization rate',
      'The fastest conduction velocity via Purkinje fibers',
      'The longest effective refractory period',
      'Maximum number of fast sodium channels'
    ],
    correctOptionIndex: 1,
    explanation: 'The Sinoatrial (SA) node acts as the normal cardiac pacemaker because its P-cells exhibit the highest intrinsic rate of automaticity due to the steepest slope of Phase 4 spontaneous diastolic depolarization (mediated by funny sodium channels If and transient T-type calcium channels).'
  },
  {
    id: 'q_03',
    examType: 'FCPS-1',
    subject: 'Internal Medicine / Nephrology',
    question: 'A 60-year-old diabetic patient with microalbuminuria is best started on which antihypertensive agent for nephroprotection?',
    options: [
      'Amlodipine (CCB)',
      'Ramipril (ACE Inhibitor) or Losartan (ARB)',
      'Hydrochlorothiazide (Thiazide)',
      'Atenolol (Beta-blocker)',
      'Spironolactone (MRA)'
    ],
    correctOptionIndex: 1,
    explanation: 'ACE inhibitors (e.g. Ramipril) and ARBs (e.g. Losartan/Telmisartan) cause preferential efferent arteriolar vasodilation in renal glomeruli, lowering intraglomerular hydrostatic pressure and significantly slowing diabetic nephropathy progression.'
  }
];

export interface ForumPost {
  id: string;
  authorNameBn: string;
  authorTitleBn: string;
  authorAvatar: string;
  createdAtBn: string;
  categoryBn: string;
  title: string;
  content: string;
  upvotes: number;
  commentsCount: number;
}

export const mockForumPosts: ForumPost[] = [
  {
    id: 'f1',
    authorNameBn: 'ডা. সায়রা আফরিন',
    authorTitleBn: 'কার্ডিওলজিস্ট, ন্যাশনাল হার্ট ফাউন্ডেশন',
    authorAvatar: 'https://images.unsplash.com/photo-1594824813512-58e1c667088b?auto=format&fit=crop&w=100&q=80',
    createdAtBn: '২ ঘণ্টা আগে',
    categoryBn: 'ECG কেস রিভিউ',
    title: 'ECG Case: Hyperacute T waves in Leads V1-V4 (Early Anterior STEMI)',
    content: 'A 52-year-old diabetic male presented with acute retrosternal chest tightness for 45 minutes. The initial ECG shows prominent symmetrical peaked T waves with slight ST elevation in V2-V4. Remember, early recognition of hyperacute T waves before marked ST elevation saves precious myocardium!',
    upvotes: 42,
    commentsCount: 14
  },
  {
    id: 'f2',
    authorNameBn: 'আয়ান চৌধুরী',
    authorTitleBn: '৫ম বর্ষ এমবিবিএস শিক্ষার্থী, ডিএমসি (K-78)',
    authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80',
    createdAtBn: '৫ ঘণ্টা আগে',
    categoryBn: 'ক্লিনিক্যাল হিস্ট্রি',
    title: 'Ward 1 Case Discussion: Dengue with Severe Thrombocytopenia',
    content: 'আজকে ওয়ার্ডে ভর্তি এক রোগীর প্লাটিলেট কাউন্ট ১৫,০০০/uL এ নেমে গিয়েছিল, কিন্তু কোনো ফ্রাঙ্ক ব্লিডিং ছিল না। ফ্লুইড ম্যানেজমেন্ট প্রটোকল কঠোরভাবে মানা হচ্ছে। প্লাটিলেট ট্রান্সফিউশনের সুনির্দিষ্ট নির্দেশনাবলী নিয়ে সিনিয়র ডাক্তারদের পরামর্শ আশা করছি।',
    upvotes: 28,
    commentsCount: 9
  }
];

