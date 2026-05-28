import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact & Location",
  description:
    "Visit Shiv Shakti Health Clinic in Pimpri Chinchwad. Find our location on Google Maps, OPD timings, phone number, and contact form.",
};

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="text-center py-xl px-md md:px-lg max-w-container-max mx-auto w-full">
        <div className="inline-block bg-secondary-container/30 text-secondary font-label-technical text-label-technical px-sm py-xs rounded-full mb-md">
          Find Us
        </div>
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-sm">
          Contact &amp; Location
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          We&apos;re conveniently located in Pimpri Chinchwad, Pune. Walk in or book your visit online.
        </p>
      </section>

      <section className="pb-xl px-md md:px-lg max-w-container-max mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-lg items-start">
        {/* Map Embed */}
        <div className="rounded-[2rem] overflow-hidden border border-outline-variant/30 shadow-soft h-[400px] md:h-[500px]">
          <iframe
            title="Shiv Shakti Health Clinic Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.0674882706624!2d73.79804!3d18.65267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9c7c16b8b1d%3A0xfab5b35f2eb12dd!2sPimpri-Chinchwad%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Info + Contact Form */}
        <div className="flex flex-col gap-md">
          {/* Clinic Info Card */}
          <div className="bg-surface border border-outline-variant/30 rounded-2xl p-lg shadow-soft">
            <h2 className="font-headline-sm text-headline-sm text-primary mb-md flex items-center gap-sm">
              <span className="material-symbols-outlined text-secondary">local_hospital</span>
              Clinic Information
            </h2>
            <ul className="flex flex-col gap-sm">
              {[
                { icon: "location_on", text: "Pimpri Chinchwad, Pune, Maharashtra" },
                { icon: "call", text: "+91 96737 09322" },
                { icon: "schedule", text: "Mon–Sat: 9AM–1PM | 5PM–9PM" },
                { icon: "emergency", text: "Emergency: Available on WhatsApp" },
              ].map(({ icon, text }) => (
                <li key={text} className="flex items-start gap-sm text-on-surface-variant font-body-md text-body-md">
                  <span className="material-symbols-outlined text-secondary mt-[2px] flex-shrink-0">
                    {icon}
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-lg flex flex-col sm:flex-row gap-sm">
              <a
                href="tel:+919673709322"
                className="flex-1 btn-gradient text-on-primary font-button text-button px-md py-sm rounded-full text-center hover:shadow-lg transition-all"
              >
                Call Us
              </a>
              <a
                href="https://wa.me/919673709322"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#25D366] text-white font-button text-button px-md py-sm rounded-full text-center hover:opacity-90 transition-opacity"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-surface border border-outline-variant/30 rounded-2xl p-lg shadow-soft">
            <h2 className="font-headline-sm text-headline-sm text-primary mb-md">Send a Message</h2>
            <form className="flex flex-col gap-sm" action="#">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-outline-variant rounded-lg p-3 font-body-md text-body-md form-input-focus transition-colors bg-surface-container-lowest"
              />
              <input
                type="tel"
                placeholder="+91 Phone Number"
                className="w-full border border-outline-variant rounded-lg p-3 font-body-md text-body-md form-input-focus transition-colors bg-surface-container-lowest"
              />
              <textarea
                rows={4}
                placeholder="Your message..."
                className="w-full border border-outline-variant rounded-lg p-3 font-body-md text-body-md form-input-focus transition-colors bg-surface-container-lowest resize-none"
              />
              <button
                type="submit"
                className="btn-gradient text-on-primary font-button text-button px-md py-sm rounded-full hover:shadow-lg transition-all w-full"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Online Consultation Callout */}
          <div className="bg-secondary rounded-2xl p-lg text-white flex flex-col gap-sm shadow-xl">
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-secondary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>
                video_chat
              </span>
              <h3 className="font-headline-sm text-headline-sm">Online Consultation</h3>
            </div>
            <p className="font-body-md text-body-md text-secondary-fixed opacity-90">
              Consult our doctors from the comfort of your home via video call.
            </p>
            <Link
              href="/appointment?type=online"
              className="self-start mt-sm bg-white text-secondary font-button text-button px-md py-sm rounded-full hover:bg-secondary-fixed transition-colors"
            >
              Book Online Session
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
