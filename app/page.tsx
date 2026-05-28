import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { clinicStats, testimonials } from "@/lib/data/testimonials";

export const metadata: Metadata = {
  title: "Shiv Shakti Health Clinic — Trusted Healthcare in Pimpri Chinchwad",
  description:
    "Expert care from BHMS & BAMS doctors. Homoeopathy, Gynaecology, General Check-ups and more. Book your appointment today.",
};

export default function HomePage() {
  return (
    <>
      {/* ══════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════ */}
      <section className="flex items-center pt-xl pb-xl px-md md:px-lg max-w-container-max mx-auto w-full relative">
        {/* Heartbeat decoration */}
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-10">
          <svg
            className="stroke-primary-container animate-pulse-slow"
            height="200"
            viewBox="0 0 1000 200"
            width="100%"
            preserveAspectRatio="none"
          >
            <path
              d="M0,100 L400,100 L420,50 L450,150 L480,20 L520,180 L550,80 L580,120 L600,100 L1000,100"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl w-full z-10 items-center">
          {/* Left: Content */}
          <div className="lg:col-span-6 flex flex-col items-start gap-md">
            {/* Pill Label */}
            <div className="inline-flex items-center gap-xs bg-surface-container-high text-primary-container border border-outline-variant/40 px-sm py-[6px] rounded-full shadow-sm backdrop-blur-sm">
              <span className="material-symbols-outlined text-[16px] text-secondary">stars</span>
              <span className="font-label-technical text-label-technical uppercase tracking-wider">
                Trusted Healthcare in Pimpri Chinchwad
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mt-sm text-balance">
              Expert Care. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-secondary">
                Trusted Treatment.
              </span>
            </h1>

            {/* Subtext */}
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[500px] mt-sm">
              Consult experienced BHMS &amp; BAMS doctors for general checkups, gynecology,
              homoeopathic treatment &amp; more. Bringing care to life with empathy and precision.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-sm mt-md w-full">
              <Link
                href="/appointment"
                className="flex items-center justify-center gap-xs rounded-full btn-gradient text-on-primary px-lg py-md font-button text-button shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-300 group"
              >
                Book Appointment
                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
              <Link
                href="/appointment?type=online"
                className="flex items-center justify-center rounded-full bg-transparent border-[1.5px] border-primary-container text-primary-container px-lg py-[14px] font-button text-button hover:bg-surface-container-low active:scale-95 transition-all duration-300"
              >
                Online Consultation
              </Link>
            </div>

            {/* OPD Timings Info Card */}
            <div className="mt-lg backdrop-blur-xl bg-white/60 border border-outline-variant/30 rounded-xl p-sm pr-lg shadow-soft flex items-center gap-md border-l-4 border-l-secondary hover:bg-white/80 transition-all">
              <div className="w-10 h-10 rounded-full bg-secondary-container/50 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-on-secondary-container">schedule</span>
              </div>
              <div>
                <p className="font-label-technical text-label-technical text-outline uppercase mb-xs">
                  OPD Timings
                </p>
                <p className="font-body-md text-body-md text-on-surface font-medium whitespace-nowrap">
                  9AM–1PM | 5PM–9PM | Mon–Sat
                </p>
              </div>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end min-h-[500px] w-full">
            {/* Animated blobs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-gradient-to-tr from-surface-container-highest to-inverse-primary/40 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-xl opacity-80 animate-[spin_60s_linear_infinite] z-0" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-br from-secondary-fixed/30 to-primary-fixed/50 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-lg opacity-90 animate-[spin_40s_linear_infinite_reverse] z-0" />

            {/* Hero image */}
            <div className="relative z-10 w-full md:w-[480px] aspect-[4/3] rounded-[2rem] overflow-hidden border-[6px] border-white shadow-2xl shadow-primary-container/20 self-center animate-float">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbJjBeO89TkJAWdVxZ3TQNW_YjXzCK-CPUCUOBUCKkdW1gUC9egfXKt6A71RSMpnixYcNI1JlfgJEvaXuWYwUvamW-JmiXNBXrbcaboVbv4ZQ5b5JwriGgM7DQ1x8gKnxPxbnn56lUkYiYEsr74nOD5GrlQ8bUfLEb83NxOxYhOzsMn77iQyrPTQq7RmUzC9nWMFSPoUzzrGDODfskJ9SC_U8SXUoiuLyjXdk4w45-CL_lVp9tsHpZZsJYN4_O00PwA8nEcyuKgQqa"
                alt="Luxury Clinic Room"
                fill
                className="object-cover object-center"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-container/20 to-transparent" />
            </div>

            {/* Floating Badge 1 */}
            <div className="absolute z-20 bottom-8 -left-4 md:left-4 backdrop-blur-xl bg-white/80 border border-outline-variant/30 rounded-xl p-sm shadow-xl flex items-center gap-sm animate-float-delayed">
              <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  groups
                </span>
              </div>
              <div className="pr-sm">
                <p className="font-headline-sm text-[20px] font-bold text-on-background leading-tight">2</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-tight">Specialist Doctors</p>
              </div>
            </div>

            {/* Floating Badge 2 */}
            <div className="absolute z-20 top-12 -right-2 md:-right-8 backdrop-blur-xl bg-white/80 border border-outline-variant/30 rounded-xl p-sm shadow-xl flex items-center gap-sm animate-float">
              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-secondary-container">medical_services</span>
              </div>
              <div className="pr-sm">
                <p className="font-headline-sm text-[18px] font-bold text-on-background leading-tight">9+</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-tight">Services Available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════ */}
      <div className="w-full bg-surface-container-low border-y border-outline-variant/30 py-lg">
        <div className="max-w-container-max mx-auto px-md md:px-lg grid grid-cols-2 md:grid-cols-4 gap-y-md md:gap-y-0 divide-x-0 md:divide-x divide-outline-variant/30">
          {clinicStats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center px-sm">
              <span className="font-headline-md text-headline-md text-primary mb-xs">{stat.value}</span>
              <span className="font-label-technical text-label-technical text-on-surface-variant uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          SERVICES PREVIEW
      ══════════════════════════════════════════ */}
      <section className="py-xl px-md md:px-lg max-w-container-max mx-auto w-full">
        <div className="text-center mb-lg">
          <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-background">
            Our Core Services
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-sm max-w-2xl mx-auto">
            Comprehensive healthcare solutions tailored to your unique needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
          {[
            {
              icon: "stethoscope",
              title: "General Check-up",
              desc: "Routine medical examinations and preventive care to keep you healthy and active.",
              bg: "bg-primary-container/20 text-primary",
              hoverBg: "group-hover:bg-primary group-hover:text-on-primary",
            },
            {
              icon: "spa",
              title: "Homoeopathy",
              desc: "Natural and holistic treatments for chronic and acute ailments without side effects.",
              bg: "bg-secondary-container/20 text-secondary",
              hoverBg: "group-hover:bg-secondary group-hover:text-on-secondary",
            },
            {
              icon: "pregnant_woman",
              title: "Gynaecology",
              desc: "Expert care for women's health, from adolescence through menopause and beyond.",
              bg: "bg-primary-container/20 text-primary",
              hoverBg: "group-hover:bg-primary group-hover:text-on-primary",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-surface border border-outline-variant/30 p-lg rounded-[2rem] hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-md transition-colors ${card.bg} ${card.hoverBg}`}
              >
                <span className="material-symbols-outlined text-[28px]">{card.icon}</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-background mb-sm">{card.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">{card.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-lg flex justify-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-xs font-button text-button text-primary hover:text-secondary transition-colors group"
          >
            View All Services
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY CHOOSE US
      ══════════════════════════════════════════ */}
      <section className="py-xl px-md md:px-lg max-w-container-max mx-auto w-full">
        <div className="bg-surface-container rounded-[2rem] p-lg md:p-xl grid grid-cols-1 lg:grid-cols-2 gap-xl items-center shadow-sm border border-outline-variant/20">
          <div className="flex flex-col gap-md order-2 lg:order-1">
            <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-background">
              Why Choose Us?
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-sm">
              We are committed to providing the highest quality healthcare with a focus on compassion,
              excellence, and holistic well-being.
            </p>
            <ul className="flex flex-col gap-sm">
              {[
                { icon: "volunteer_activism", label: "Compassionate Care", color: "bg-secondary-container/50 text-on-secondary-container" },
                { icon: "apartment", label: "Modern Facilities", color: "bg-primary-container/30 text-primary" },
                { icon: "medical_information", label: "Expert Doctors", color: "bg-secondary-container/50 text-on-secondary-container" },
                { icon: "self_improvement", label: "Holistic Approach", color: "bg-primary-container/30 text-primary" },
              ].map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-md bg-surface p-sm rounded-xl border border-outline-variant/20 shadow-sm"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${item.color}`}>
                    <span className="material-symbols-outlined">{item.icon}</span>
                  </div>
                  <span className="font-headline-sm text-[20px] text-on-background">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative rounded-[2rem] overflow-hidden border-[6px] border-white shadow-xl aspect-square order-1 lg:order-2">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCk7Z0oAXQXhtVDG6HeQQ-3deAMu_Z_BQOW9s2fWQa0vLOeIyQOuIUyvV3HDuIVIuL7xDcAGxy89Khc85Gcp5XaiIZUNSjAr3H7_Ylpu0x7rDNHHraLH_bc0yFrugYW0F4h1hXPXyQlYumCM0CjpHr4RZteVQTnLWHo62HPBfNEsX7CEjekB6hfD22yV-MCRaBylUXPy-st-glFxvcSJRKyaxWjWjsen3GNgRHUJ40GH3pAgQdceB3449qKZuEP7kmQceZXRkGWXPwa"
              alt="Doctor and Patient"
              fill
              className="object-cover object-center"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-container/30 to-transparent" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section className="py-xl px-md md:px-lg max-w-container-max mx-auto w-full flex flex-col items-center">
        <div className="text-center mb-lg">
          <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-background">
            Patient Stories
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-sm">
            Real experiences from people who trust us with their health.
          </p>
        </div>

        {/* Google Reviews Badge */}
        <div className="flex items-center gap-sm bg-surface-container-low border border-outline-variant/30 rounded-full px-lg py-sm shadow-sm mb-xl">
          <span className="font-body-md font-medium text-on-surface">Google Verified Reviews</span>
          <div className="flex items-center gap-xs ml-sm">
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className="material-symbols-outlined text-[18px] text-[#FFB400]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
            ))}
          </div>
          <span className="font-body-md font-bold text-on-surface ml-xs">5.0</span>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md w-full">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-surface-container-lowest p-lg rounded-2xl shadow-sm border border-outline-variant/10 flex flex-col gap-md relative"
            >
              <span className="material-symbols-outlined text-secondary-fixed-dim text-[40px] opacity-40 absolute top-4 left-4">
                format_quote
              </span>
              <p className="font-body-md italic text-on-surface-variant mt-8 leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-sm mt-auto pt-sm">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={t.photo}
                    alt={t.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <p className="font-body-md font-bold text-on-surface">{t.name}</p>
                  <p className="font-body-sm text-outline">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════ */}
      <section className="py-xl px-md md:px-lg max-w-container-max mx-auto w-full mb-xl">
        <div className="bg-secondary rounded-3xl p-lg md:p-xl text-center shadow-xl">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-white mb-sm">
              Ready to prioritize your health?
            </h2>
            <p className="font-body-lg text-body-lg text-secondary-fixed mb-lg opacity-90">
              Schedule a consultation with our world-class specialists today and experience healthcare
              designed around you.
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
