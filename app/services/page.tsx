import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Comprehensive healthcare services at Shiv Shakti Health Clinic — General Check-ups, Homoeopathy, Gynaecology, Nebulization, Home Visits and more.",
};

export default function ServicesPage() {
  return (
    <>
      {/* ══════════════════════════════════════════
          HEADER
      ══════════════════════════════════════════ */}
      <section className="text-center py-xl px-md md:px-lg max-w-container-max mx-auto w-full">
        <div className="inline-block bg-surface-variant text-secondary font-label-technical text-label-technical px-sm py-xs rounded-full uppercase tracking-widest mb-md shadow-sm">
          What We Offer
        </div>
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-md">
          Comprehensive Care Under One Roof
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mx-auto">
          From routine checkups to specialized treatments, we cover all your healthcare needs with
          compassion and clinical excellence.
        </p>
      </section>

      {/* ══════════════════════════════════════════
          SERVICES BENTO GRID
      ══════════════════════════════════════════ */}
      <section className="pb-xl px-md md:px-lg max-w-container-max mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
          {services.map((service, idx) => (
            <article
              key={service.id}
              className="service-card bg-white rounded-xl p-md border border-[#E5EBF5] shadow-card"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="icon-wrapper w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center mb-md transition-colors duration-300">
                <span className="material-symbols-outlined text-primary">{service.icon}</span>
              </div>
              <div className="inline-block bg-surface-container-low text-on-surface-variant font-label-technical text-label-technical px-2 py-1 rounded-md mb-sm">
                {service.category}
              </div>
              <h2 className="font-button text-button text-primary mb-xs">{service.title}</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA SECTION
      ══════════════════════════════════════════ */}
      <section className="w-full max-w-container-max mx-auto px-gutter md:px-lg mb-xl">
        <div className="bg-secondary rounded-3xl p-lg md:p-xl text-center shadow-xl">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-white mb-sm">
              Ready to prioritize your health?
            </h2>
            <p className="font-body-lg text-body-lg text-secondary-fixed mb-lg opacity-90">
              Schedule a consultation with our world-class specialists in Pune today and experience
              healthcare designed around you.
            </p>
            <div className="flex flex-col sm:flex-row gap-md justify-center items-center">
              <Link
                href="/appointment"
                className="bg-white text-secondary font-button text-button px-xl py-sm rounded-full hover:bg-secondary-fixed transition-colors shadow-md min-w-[220px] text-center"
              >
                Book Online Now
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white font-button text-button px-xl py-sm rounded-full hover:bg-white/10 transition-colors min-w-[220px] text-center"
              >
                Contact Our Clinic
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
