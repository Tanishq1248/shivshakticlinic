// lib/data/services.ts
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // Material Symbols icon name
  category: string;
}

export const services: Service[] = [
  {
    id: "general-checkup",
    title: "General Check-Ups",
    description: "Routine health assessments for all ages to keep you healthy and proactive.",
    icon: "stethoscope",
    category: "Primary Care",
  },
  {
    id: "gynaecology",
    title: "Gynecological Examination",
    description: "Expert women's health consultations from adolescence through menopause.",
    icon: "gynecology",
    category: "Women's Health",
  },
  {
    id: "bp-sugar",
    title: "Blood Pressure & Sugar Checkup",
    description: "Regular monitoring of vital signs for diabetes and hypertension management.",
    icon: "blood_pressure",
    category: "Diagnostics",
  },
  {
    id: "homoeopathy",
    title: "Homoeopathic Treatment",
    description: "Natural, holistic healing therapies without side effects for chronic ailments.",
    icon: "spa",
    category: "Alternative Medicine",
  },
  {
    id: "nebulization",
    title: "Nebulization Facility",
    description: "On-site respiratory care and treatment for asthma and breathing issues.",
    icon: "air",
    category: "Respiratory Care",
  },
  {
    id: "suturing",
    title: "Suturing & Dressing",
    description: "Professional wound care, suturing, and dressing by trained practitioners.",
    icon: "healing",
    category: "Emergency Care",
  },
  {
    id: "injection",
    title: "Injection & Saline",
    description: "Safe IV and injection administration by qualified medical staff.",
    icon: "vaccines",
    category: "Procedures",
  },
  {
    id: "online-consultation",
    title: "Online Consultation",
    description: "Video consultations from the comfort of your home with our doctors.",
    icon: "video_chat",
    category: "Telemedicine",
  },
  {
    id: "home-visit",
    title: "Home Visit",
    description: "Doctor visits at your doorstep for patients who cannot travel to clinic.",
    icon: "home_health",
    category: "Home Care",
  },
];
