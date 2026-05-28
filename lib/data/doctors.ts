// lib/data/doctors.ts
export interface Doctor {
  id: string;
  name: string;
  qualification: string;
  specialties: string[];
  bio: string;
  experience: string;
  regNo: string;
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
  badgeClass: string;
  buttonClass: string;
  photo: string; // URL or local path placeholder
}

export const doctors: Doctor[] = [
  {
    id: "dr-rajput",
    name: "Dr. Rajput Akash Rakesh",
    qualification: "BHMS",
    specialties: ["General Medicine", "Homoeopathy"],
    bio: "Experienced homoeopathic physician providing holistic and effective treatments for all age groups. Focuses on addressing root causes of ailments with a patient-first approach.",
    experience: "5+ Years Experience",
    regNo: "79124",
    gradientFrom: "#006a6a",
    gradientTo: "#5bd9d9",
    borderColor: "border-secondary",
    badgeClass: "bg-secondary/10 text-secondary",
    buttonClass: "from-secondary to-secondary-fixed-dim",
    photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAs8GHoz3z2P5RtrDPS_oJWHUZttlWeMScXDIyqDiZ0EIw9rFId34PNXKazToiS3UKLnmPCiumwZ4E7MNgUNt6n2v-VhgCL7jGrCIMc1n2veigL6VZ9AYLZ8zfw8o_Z_ASkSksJtOsPo0cPSj8YsZphIJVHUN-Tzj9cf3ZseCA18NSI9mNB4SVn4KBGuMx0uLWxOogHFi4kbuJOeyA-Ho7gYs5VPkIDFexZxtdQL3wZwu1ZRh7K6C6Yez3bTryg7RybRVTf8HRGCqtJ",
  },
  {
    id: "dr-gadade",
    name: "Dr. Vishnu Anandrao Gadade",
    qualification: "BAMS",
    specialties: ["Ayurveda", "General Practice"],
    bio: "Dedicated Ayurvedic doctor with a patient-first approach to preventive and curative healthcare, utilizing traditional wellness practices for comprehensive treatment.",
    experience: "5+ Years Experience",
    regNo: "I-119866-A",
    gradientFrom: "#1b4f8a",
    gradientTo: "#3abfbf",
    borderColor: "border-primary-container",
    badgeClass: "bg-primary-container/10 text-primary-container",
    buttonClass: "from-primary-container to-secondary",
    photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1-UaSezyTttgRpxkRQDcrzFoGy_-EYnVv6-6QHNCUR-Vv7NGuTJY_89gcdPpETxEqfzUcOiyl4DGQLAvyGNmJKdqOcG5zbFHZ7X093pli8Ce0DXncVaouKZb3qMMEgqbUVCAXt-NoFVepgBE0DwlYgS71TJq6vjgVyi8j5-N0LRU_nmRb7TQvvMsY0IqGOIEiIUxzd-uiIajeNxAnphH0Ep9pb_h67o7Jh1H5nCVDQCd71WiBJee247C4SI2gjjMAdMdbnJt5q_yJ",
  },
];
