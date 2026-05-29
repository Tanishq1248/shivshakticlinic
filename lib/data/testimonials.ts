// lib/data/testimonials.ts
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  photo: string;
  rating?: number;
  verified?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Rajesh Patil",
    role: "General Check-up Patient",
    quote:
      "The level of care I received at Shiv Shakti Health Clinic was exceptional. Dr. Sameer took the time to explain everything clearly and made me feel completely at ease.",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBw-OjshhlKva7AhYk7qJrHF9UVswjtZAuaMoVgI6Wulpq5BMIutpMNlbtZQnku3aFw3norDkWmyGz_YrTKNva-drL0rzRhAq8BhCti-7Rjfa92LR9mh76UtZcrXeyYeoZTP7I7q3xWGF1DLpfemRYbFmcuzmi4zs627LuUSPDGQgMGkZMOK6J16bopUYUyEV05kY3hw0MX5wwbrYxGf9I5UjkUTKMopc1-lesN2dgrjOZaUumB574oll3N60BwZKzkm2Oh8q1yXiaU",
    rating: 5,
    verified: true,
  },
  {
    id: "2",
    name: "Sneha Desai",
    role: "Homoeopathy Patient",
    quote:
      "Every visit is streamlined and clean. The doctors are highly professional and they value scheduling. I highly recommend their diagnostic wing in Pimpri Chinchwad.",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBWCOiZFMYeYipUsTGjJ0kHE7rDMKUK0qprD31Kye8LXGWD-R616mz1lY3XP3Uj6B2Kz00rAaCsq-CBGNGn_oz58zB4EFf8hta_1WzEezhwGAYGQo2aUZQNkcEtwTHL92uL41XxtY7Cs0wMcRARomg_eGsWTBfyLyIEXlAyQov2MVxbaYU_VrUbD8MUDGzNoq4uoEKZ2Ekh3XwUFRN0dDX332-tc_pXoVZgyWsHdsveIe9UVXcZMXeIZ0JqL31fhRCWB64niAgx3a3W",
    rating: 5,
    verified: true,
  },
  {
    id: "3",
    name: "Amit Joshi",
    role: "Gynaecology Patient",
    quote:
      "Exceptional clinical service. The staff is polite, the medical facilities feel like a premium boutique clinic, and the diagnostics are incredibly fast.",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA-6WWvvRmJe-jYXM6ltc5uiE88kwemBmko3HkIORVI-YAfuiULL31Ti00vUlwkdlwSanCe1yuxmWUov_E-vlx9iWhuI0DPjYXOKM9lOtJ7DrcILif9MR0UNEZLkbqMYS5o4zhnFXEUZJeSC3c4haSMfjVk8GuCGTNaKXA6qcH73qH128SSsbv04dR25fXcEfhgaTm4ULtdQwrvLWGdWb0sTd5ponLTqWNbMLcmgUuhV_P8JKe8_ZXVFDpNJGj36Mt2Bsf0kVTqTz4A",
    rating: 5,
    verified: true,
  },
  {
    id: "4",
    name: "Priya Kulkarni",
    role: "Homoeopathy Patient",
    quote:
      "I had been struggling with recurring migraines for years. After homoeopathic treatment at Shiv Shakti, the frequency has reduced dramatically. Truly life-changing!",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBWCOiZFMYeYipUsTGjJ0kHE7rDMKUK0qprD31Kye8LXGWD-R616mz1lY3XP3Uj6B2Kz00rAaCsq-CBGNGn_oz58zB4EFf8hta_1WzEezhwGAYGQo2aUZQNkcEtwTHL92uL41XxtY7Cs0wMcRARomg_eGsWTBfyLyIEXlAyQov2MVxbaYU_VrUbD8MUDGzNoq4uoEKZ2Ekh3XwUFRN0dDX332-tc_pXoVZgyWsHdsveIe9UVXcZMXeIZ0JqL31fhRCWB64niAgx3a3W",
    rating: 5,
    verified: true,
  },
  {
    id: "5",
    name: "Suresh Nair",
    role: "General Check-up Patient",
    quote:
      "The clinic has the warmth of a family doctor combined with the precision of a specialist. My whole family now visits Shiv Shakti exclusively. Highly recommended!",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBw-OjshhlKva7AhYk7qJrHF9UVswjtZAuaMoVgI6Wulpq5BMIutpMNlbtZQnku3aFw3norDkWmyGz_YrTKNva-drL0rzRhAq8BhCti-7Rjfa92LR9mh76UtZcrXeyYeoZTP7I7q3xWGF1DLpfemRYbFmcuzmi4zs627LuUSPDGQgMGkZMOK6J16bopUYUyEV05kY3hw0MX5wwbrYxGf9I5UjkUTKMopc1-lesN2dgrjOZaUumB574oll3N60BwZKzkm2Oh8q1yXiaU",
    rating: 5,
    verified: true,
  },
];

export const clinicStats = [
  { value: "10+", label: "Years Experience" },
  { value: "5000+", label: "Happy Patients" },
  { value: "24/7", label: "Support" },
  { value: "Expert", label: "Specialists" },
];
