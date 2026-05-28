import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { doctors } from "@/lib/data/doctors";

export const metadata: Metadata = {
  title: "Doctors & Specialists",
  description:
    "Meet our experienced BHMS and BAMS doctors at Shiv Shakti Health Clinic — Dr. Rajput Akash Rakesh and Dr. Vishnu Anandrao Gadade.",
};

export default function DoctorsPage() {
  return (
    <>
      {/* Header */}
      <section className="text-center py-xl px-md md:px-lg max-w-container-max mx-auto w-full">
        <div className="inline-block bg-secondary-container/30 text-secondary font-label-technical text-label-technical px-sm py-xs rounded-full mb-md">
          Meet Our Specialists
        </div>
        <h1 className="font-display-lg text-display-lg text-primary mb-sm">
          Experienced Doctors, Compassionate Care
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Our qualified practitioners bring years of expertise to every consultation, providing
          personalized and professional healthcare.
        </p>
      </section>

      {/* Doctor Cards */}
      <section className="pb-xl px-md md:px-lg max-w-container-max mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg max-w-4xl mx-auto">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="doctor-card bg-surface-container-lowest rounded-[20px] p-md border border-outline-variant/30 flex flex-col h-full relative overflow-hidden group"
            >
              {/* Top gradient accent bar */}
              <div
                className="absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, ${doc.gradientFrom} 0%, ${doc.gradientTo} 100%)` }}
              />

              {/* Photo + Name */}
              <div className="flex items-start gap-md mb-md">
                <div className={`relative w-24 h-24 rounded-full p-1 border-2 ${doc.borderColor} shrink-0`}>
                  <Image
                    src={doc.photo}
                    alt={`Portrait of ${doc.name}`}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover rounded-full"
                    unoptimized
                  />
                </div>
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-primary mb-xs">{doc.name}</h2>
                  <div
                    className={`inline-block font-label-technical text-label-technical px-2 py-1 rounded-full mb-sm ${doc.badgeClass}`}
                  >
                    {doc.qualification}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {doc.specialties.map((spec) => (
                      <span
                        key={spec}
                        className="bg-surface-container-low text-on-surface-variant font-label-technical text-label-technical px-2 py-1 rounded-md"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-lg flex-grow">{doc.bio}</p>

              {/* Footer */}
              <div className="mt-auto">
                <div className="flex items-center gap-md mb-md text-secondary font-label-technical text-label-technical">
                  <span className="flex items-center gap-xs">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    Govt Registered
                  </span>
                  <span className="flex items-center gap-xs">
                    <span className="material-symbols-outlined text-[16px]">work</span>
                    {doc.experience}
                  </span>
                </div>
                <div className="border-t border-outline-variant/30 pt-sm mb-md">
                  <span className="font-label-technical text-label-technical text-outline">
                    Reg. No: {doc.regNo}
                  </span>
                </div>
                <Link
                  href={`/appointment?doctor=${encodeURIComponent(doc.name)}`}
                  className="w-full font-button text-button py-sm rounded-full shadow-md flex justify-center items-center gap-sm hover:opacity-90 transition-opacity text-on-primary"
                  style={{ background: `linear-gradient(90deg, ${doc.gradientFrom} 0%, ${doc.gradientTo} 100%)` }}
                >
                  Book Appointment
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
