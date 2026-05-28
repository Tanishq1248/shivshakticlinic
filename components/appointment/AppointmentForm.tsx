"use client";

import { useState } from "react";
import { addAppointment, buildWhatsAppUrl } from "@/lib/firestore";
import { services } from "@/lib/data/services";
import { doctors } from "@/lib/data/doctors";

const VISIT_TYPES = ["In-Clinic", "Online", "Home Visit"];

type Step = 1 | 2 | 3;

interface FormData {
  fullName: string;
  phone: string;
  age: string;
  gender: string;
  service: string;
  doctor: string;
  visitType: string;
  date: string;
  time: string;
  notes: string;
}

const INITIAL_FORM: FormData = {
  fullName: "",
  phone: "",
  age: "",
  gender: "Male",
  service: "",
  doctor: "No Preference",
  visitType: "In-Clinic",
  date: "",
  time: "",
  notes: "",
};

export default function AppointmentForm() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [error, setError] = useState("");

  const update = (key: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      await addAppointment({ ...form });
      const url = buildWhatsAppUrl({ ...form });
      setWhatsappUrl(url);
      setSuccess(true);
    } catch (e) {
      setError("Failed to book. Please try WhatsApp directly.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setForm(INITIAL_FORM);
    setStep(1);
    setSuccess(false);
    setWhatsappUrl("");
    setError("");
  };

  const StepIndicator = ({ num, label }: { num: number; label: string }) => {
    const done = success ? true : step > num;
    const active = !success && step === num;
    return (
      <div className="flex flex-col items-center gap-xs bg-surface px-2">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center font-button text-button shadow-sm transition-colors duration-300 ${
            done
              ? "bg-primary-container text-on-primary"
              : active
              ? "bg-secondary text-on-secondary"
              : "bg-surface-container text-on-surface-variant border border-outline-variant"
          }`}
        >
          {done ? (
            <span className="material-symbols-outlined text-[18px]">check</span>
          ) : (
            num
          )}
        </div>
        <span
          className={`font-label-technical text-label-technical ${
            active ? "text-secondary font-bold" : "text-on-surface-variant"
          }`}
        >
          {label}
        </span>
      </div>
    );
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-xl text-center">
        <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mb-md">
          <span className="material-symbols-outlined text-[40px] text-secondary">check_circle</span>
        </div>
        <h3 className="font-headline-md text-headline-md text-primary mb-sm">Appointment Booked!</h3>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-md mb-lg">
          Your appointment has been saved. Please confirm on WhatsApp for instant confirmation.
        </p>
        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-sm bg-[#25D366] text-white font-button text-button px-lg py-sm rounded-full hover:opacity-90 transition-opacity shadow-sm mb-md"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              chat
            </span>
            Confirm on WhatsApp
          </a>
        )}
        <button
          onClick={reset}
          className="btn-gradient text-on-primary font-button text-button px-lg py-sm rounded-full hover:shadow-lg transition-all"
        >
          Book Another
        </button>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-soft border border-outline-variant/30 overflow-hidden max-w-4xl mx-auto">
      {/* Step Header */}
      <div className="bg-surface p-md border-b border-outline-variant/30">
        <div className="flex items-center justify-between max-w-2xl mx-auto relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-outline-variant/30 -z-10 -translate-y-1/2" />
          <div
            className="absolute top-1/2 left-0 h-0.5 bg-secondary -z-10 -translate-y-1/2 transition-all duration-300"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          />
          <StepIndicator num={1} label="Personal Info" />
          <StepIndicator num={2} label="Select Slot" />
          <StepIndicator num={3} label="Confirm" />
        </div>
      </div>

      {/* Form Body */}
      <div className="p-lg">
        {error && (
          <div className="mb-md bg-error-container text-on-error-container p-sm rounded-lg font-body-sm text-body-sm">
            {error}
          </div>
        )}

        {/* ─── STEP 1: Personal Info ─── */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            <div className="flex flex-col gap-xs">
              <label className="font-body-sm text-body-sm text-on-surface font-medium" htmlFor="fullName">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="e.g. John Doe"
                required
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 font-body-md text-body-md form-input-focus transition-colors"
              />
            </div>

            <div className="flex flex-col gap-xs">
              <label className="font-body-sm text-body-sm text-on-surface font-medium" htmlFor="phone">
                Phone Number
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-outline-variant bg-surface-container font-body-md text-body-md text-on-surface-variant">
                  +91
                </span>
                <input
                  id="phone"
                  type="tel"
                  placeholder="98765 43210"
                  required
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-r-lg p-3 font-body-md text-body-md form-input-focus transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-xs">
              <label className="font-body-sm text-body-sm text-on-surface font-medium" htmlFor="age">
                Age
              </label>
              <input
                id="age"
                type="number"
                placeholder="e.g. 35"
                min={0}
                max={120}
                required
                value={form.age}
                onChange={(e) => update("age", e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 font-body-md text-body-md form-input-focus transition-colors"
              />
            </div>

            <div className="flex flex-col gap-xs">
              <span className="font-body-sm text-body-sm text-on-surface font-medium">Gender</span>
              <div className="flex gap-sm h-[50px]">
                {["Male", "Female", "Other"].map((g) => (
                  <label key={g} className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={form.gender === g}
                      onChange={() => update("gender", g)}
                      className="sr-only peer"
                    />
                    <div className="w-full h-full flex items-center justify-center rounded-lg border border-outline-variant peer-checked:border-secondary peer-checked:bg-secondary/10 peer-checked:text-secondary font-body-md text-body-md transition-all hover:bg-surface-container">
                      {g}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 flex justify-end mt-md">
              <button
                type="button"
                onClick={() => form.fullName && form.phone ? setStep(2) : null}
                className="btn-gradient text-on-primary font-button text-button px-8 py-3 rounded-full hover:shadow-lg transition-all flex items-center gap-xs"
              >
                Continue to Slot Selection
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 2: Select Slot ─── */}
        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
            <div className="flex flex-col gap-lg">
              <div className="flex flex-col gap-xs">
                <label className="font-body-sm text-body-sm text-on-surface font-medium" htmlFor="service">
                  Service Needed
                </label>
                <div className="relative">
                  <select
                    id="service"
                    value={form.service}
                    onChange={(e) => update("service", e.target.value)}
                    className="w-full appearance-none bg-surface-container-lowest border border-outline-variant rounded-lg p-3 pr-10 font-body-md text-body-md form-input-focus transition-colors outline-none cursor-pointer"
                  >
                    <option value="" disabled>Select a service...</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-xs">
                <label className="font-body-sm text-body-sm text-on-surface font-medium" htmlFor="doctor">
                  Preferred Doctor
                </label>
                <div className="relative">
                  <select
                    id="doctor"
                    value={form.doctor}
                    onChange={(e) => update("doctor", e.target.value)}
                    className="w-full appearance-none bg-surface-container-lowest border border-outline-variant rounded-lg p-3 pr-10 font-body-md text-body-md form-input-focus transition-colors outline-none cursor-pointer"
                  >
                    <option>No Preference</option>
                    {doctors.map((d) => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-xs">
                <span className="font-body-sm text-body-sm text-on-surface font-medium">Visit Type</span>
                <div className="bg-surface-container rounded-lg p-1 flex">
                  {VISIT_TYPES.map((vt) => (
                    <label key={vt} className="flex-1 cursor-pointer text-center">
                      <input
                        type="radio"
                        name="visitType"
                        value={vt}
                        checked={form.visitType === vt}
                        onChange={() => update("visitType", vt)}
                        className="sr-only peer"
                      />
                      <div className="w-full py-2 rounded-md peer-checked:bg-surface-container-lowest peer-checked:shadow-sm font-body-sm text-body-sm font-medium transition-all text-on-surface-variant peer-checked:text-primary">
                        {vt}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-lg bg-surface p-sm rounded-xl border border-outline-variant/30">
              <div className="flex flex-col gap-xs">
                <label className="font-body-sm text-body-sm text-on-surface font-medium" htmlFor="date">
                  Preferred Date
                </label>
                <input
                  id="date"
                  type="date"
                  value={form.date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => update("date", e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 font-body-md text-body-md form-input-focus transition-colors"
                />
              </div>

              <div className="flex flex-col gap-xs">
                <span className="font-body-sm text-body-sm text-on-surface font-medium">Available Time Slots</span>
                <div className="grid grid-cols-3 gap-sm">
                  {["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"].map((t) => (
                    <label key={t} className="cursor-pointer">
                      <input
                        type="radio"
                        name="time"
                        value={t}
                        checked={form.time === t}
                        onChange={() => update("time", t)}
                        className="sr-only peer"
                      />
                      <div className="text-center py-2 rounded-lg border border-outline-variant hover:border-secondary peer-checked:border-secondary peer-checked:bg-secondary/10 peer-checked:text-secondary font-label-technical text-label-technical transition-all">
                        {t}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-xs">
                <label className="font-body-sm text-body-sm text-on-surface font-medium" htmlFor="notes">
                  Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  rows={2}
                  placeholder="Any specific symptoms or concerns..."
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 font-body-md text-body-md form-input-focus transition-colors resize-none"
                />
              </div>
            </div>

            <div className="lg:col-span-2 flex justify-between items-center border-t border-outline-variant/30 pt-md">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-on-surface-variant font-button text-button hover:text-primary transition-colors flex items-center gap-xs"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span> Back
              </button>
              <button
                type="button"
                onClick={() => form.service && form.date && form.time ? setStep(3) : null}
                className="btn-gradient text-on-primary font-button text-button px-8 py-3 rounded-full hover:shadow-lg transition-all flex items-center gap-xs"
              >
                Review Details
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 3: Confirm ─── */}
        {step === 3 && (
          <div>
            <div className="bg-surface p-lg rounded-xl border border-outline-variant/30 max-w-2xl mx-auto card-glow transition-all">
              <h3 className="font-headline-sm text-headline-sm text-primary mb-md border-b border-outline-variant/30 pb-sm">
                Booking Summary
              </h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-md gap-x-sm font-body-md text-body-md">
                {[
                  { label: "Patient Name", value: form.fullName },
                  { label: "Contact", value: `+91 ${form.phone}` },
                  { label: "Age / Gender", value: `${form.age} yrs / ${form.gender}` },
                  { label: "Service", value: form.service },
                  { label: "Doctor", value: form.doctor },
                  { label: "Visit Type", value: form.visitType },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-xs">
                    <dt className="text-on-surface-variant text-body-sm">{label}</dt>
                    <dd className="font-medium text-on-surface">{value}</dd>
                  </div>
                ))}
                <div className="flex flex-col gap-xs sm:col-span-2 mt-sm pt-sm border-t border-outline-variant/30">
                  <dt className="text-on-surface-variant text-body-sm">Date &amp; Time</dt>
                  <dd className="font-headline-sm text-headline-sm text-secondary flex items-center gap-xs">
                    <span className="material-symbols-outlined">event</span>
                    {form.date} at {form.time}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-lg flex justify-between items-center border-t border-outline-variant/30 pt-md max-w-2xl mx-auto">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-on-surface-variant font-button text-button hover:text-primary transition-colors flex items-center gap-xs"
              >
                <span className="material-symbols-outlined text-sm">edit</span> Edit Details
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="btn-gradient text-on-primary font-button text-button px-8 py-3 rounded-full hover:shadow-lg transition-all flex items-center gap-xs disabled:opacity-70"
              >
                {loading ? "Booking..." : "Confirm Booking"}
                <span className="material-symbols-outlined text-sm">check</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* WhatsApp Instant Book */}
      <div className="bg-surface-container-low p-md border-t border-outline-variant/30 text-center">
        <div className="flex items-center justify-center gap-md mb-md">
          <div className="h-px bg-outline-variant/50 flex-1 max-w-[100px]" />
          <span className="font-label-technical text-label-technical text-on-surface-variant uppercase tracking-widest">
            or book instantly via
          </span>
          <div className="h-px bg-outline-variant/50 flex-1 max-w-[100px]" />
        </div>
        <a
          href="https://wa.me/919673709322?text=Hi%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Shiv%20Shakti%20Health%20Clinic."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-sm bg-[#25D366] text-white font-button text-button px-6 py-3 rounded-full hover:opacity-90 transition-opacity shadow-sm"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
          WhatsApp Us to Book
        </a>
      </div>
    </div>
  );
}
