export type UserRole = 'patient' | 'doctor' | 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  nameBn: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  // Patient specific
  bloodGroup?: string;
  dateOfBirth?: string;
  gender?: string;
  allergies?: string[];
  chronicDiseases?: string[];
  // Doctor specific
  bmdcNumber?: string;
  specialty?: string;
  specialtyBn?: string;
  qualifications?: string;
  designation?: string;
  hospital?: string;
  isBmdcVerified?: boolean;
  // Student specific
  medicalCollege?: string;
  sessionBatch?: string;
  studentPhase?: string;
  casesCount?: number;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientNameBn: string;
  patientPhone: string;
  doctorId: string;
  doctorName: string;
  doctorNameBn: string;
  doctorSpecialty: string;
  doctorSpecialtyBn: string;
  doctorHospital: string;
  doctorHospitalBn: string;
  doctorAvatar: string;
  date: string;
  dateBn: string;
  dayBn: string;
  time: string;
  timeBn: string;
  tokenNumber: number;
  status: 'confirmed' | 'in_consultation' | 'completed' | 'cancelled' | 'requested';
  statusBn: string;
  chamberName: string;
  chamberAddress: string;
  fee: number;
  isFollowUp?: boolean;
  remainingFollowUpDays?: number;
}

export interface PrescriptionMedicine {
  id: string;
  brandName: string;
  genericName: string;
  strength: string;
  dosageForm: string; // Tab, Cap, Syr, Drop, Inj
  frequency: string; // 1+0+1, 1+1+1, 0+0+1, 1+0+0
  frequencyBn: string;
  mealTiming: string; // খাবার ৩০ মিনিট পূর্বে, খাবার পরে
  durationDays: number;
  durationBn: string;
  specialInstruction?: string;
}

export interface Prescription {
  id: string;
  prescriptionNumber: string;
  patientId: string;
  patientName: string;
  patientNameBn: string;
  patientAge: number;
  patientGender: string;
  date: string;
  dateBn: string;
  doctorName: string;
  doctorNameBn: string;
  doctorDegrees: string;
  doctorBmdc: string;
  doctorHospital: string;
  chiefComplaints: string[];
  vitals: {
    bp: string;
    pulse: string;
    temp: string;
    weight: string;
    spo2?: string;
  };
  medicines: PrescriptionMedicine[];
  investigations: string[];
  adviceBn: string[];
  nextFollowUpBn: string;
}

export interface LabReport {
  id: string;
  testName: string;
  date: string;
  dateBn: string;
  labName: string;
  status: 'normal' | 'low' | 'high' | 'pending';
  statusBn: string;
  resultValue?: string;
  referenceRange?: string;
}

export interface MedicineItem {
  id: string;
  brandName: string;
  genericName: string;
  dosageForm: string;
  strength: string;
  company: string;
  mrpPrice: number;
  pregnancyCategory: string;
  indication: string;
  alternativeBrands: {
    brandName: string;
    company: string;
    price: number;
  }[];
}

export interface BloodDonor {
  id: string;
  name: string;
  bloodGroup: string;
  district: string;
  districtBn: string;
  upazila: string;
  upazilaBn: string;
  phone: string;
  lastDonationDate: string;
  isAvailable: boolean;
  cooldownDaysRemaining: number;
  totalDonations: number;
}

export interface HospitalBed {
  id: string;
  hospitalName: string;
  hospitalNameBn: string;
  district: string;
  districtBn: string;
  address: string;
  phone: string;
  generalBeds: { total: number; available: number };
  icuBeds: { total: number; available: number };
  ccuBeds: { total: number; available: number };
  nicuBeds: { total: number; available: number };
  updatedTime: string;
}

export interface ClinicalCase {
  id: string;
  title: string;
  department: string;
  patientAgeGender: string;
  chiefComplaint: string;
  hpi: string;
  generalExam: {
    anemia: string;
    jaundice: string;
    cyanosis: string;
    clubbing: string;
    edema: string;
    pulse: string;
    bp: string;
  };
  systemicExam: string;
  differentialDiagnosis: string[];
  investigationPlan: string[];
  treatmentPlan: string[];
  authorStudent: string;
  verifiedByDoctor?: string;
  likesCount: number;
}

export interface OSCEStation {
  id: string;
  title: string;
  system: string;
  timeLimitMinutes: number;
  scenario: string;
  checklistItems: {
    id: string;
    text: string;
    marks: number;
  }[];
  vivaQuestions: {
    question: string;
    answer: string;
  }[];
}

export interface PostGradQuestion {
  id: string;
  examType: 'FCPS-1' | 'Residency MD/MS' | 'Diploma';
  subject: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}
