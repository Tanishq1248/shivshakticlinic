import type { Metadata } from "next";
import AppointmentForm from "@/components/appointment/AppointmentForm";

export const metadata: Metadata = {
  title: "Book Appointment",
  description:
    "Book an appointment at Shiv Shakti Health Clinic in Pimpri Chinchwad. Online booking available for in-clinic, online, and home visit consultations.",
};

export default function AppointmentPage() {
  return (
    <div className="bg-mesh min-h-screen">
      {/* Header */}
      <section className="text-center pt-xl pb-lg px-md md:px-lg max-w-container-max mx-auto">
        <div className="inline-flex items-center justify-center bg-secondary-container/30 text-secondary px-4 py-1 rounded-full mb-md">
          <span className="font-label-technical text-label-technical uppercase tracking-wider">Easy Booking</span>
        </div>
        <h1 className="font-display-lg text-display-lg text-primary mb-md">Book Your Appointment</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Fill in your details below and we&apos;ll confirm your slot within 2 hours.
        </p>
      </section>

      <div className="px-md md:px-lg max-w-container-max mx-auto pb-xl">
        <AppointmentForm />
      </div>
    </div>
  );
}
