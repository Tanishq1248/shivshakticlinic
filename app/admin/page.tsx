"use client";

import { useEffect, useState } from "react";
import { getAppointments, type Appointment } from "@/lib/firestore";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-tertiary-fixed text-on-tertiary-fixed",
  confirmed: "bg-secondary-container text-on-secondary-container",
  cancelled: "bg-error-container text-on-error-container",
};

export default function AdminPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAppointments()
      .then((data) => setAppointments(data))
      .catch(() => setError("Unable to load appointments. Check Firebase config."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="py-xl px-md md:px-lg max-w-container-max mx-auto w-full">
      <div className="mb-lg">
        <div className="inline-block bg-secondary-container/30 text-secondary font-label-technical text-label-technical px-sm py-xs rounded-full mb-sm">
          Admin Dashboard
        </div>
        <h1 className="font-display-lg-mobile text-display-lg-mobile text-primary">Appointments</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
          Live view of all patient booking requests from Firestore.
        </p>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-xl gap-md text-on-surface-variant">
          <div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
          <span className="font-body-md">Loading appointments...</span>
        </div>
      )}

      {error && (
        <div className="bg-error-container text-on-error-container p-md rounded-xl font-body-md">
          {error}
        </div>
      )}

      {!loading && !error && appointments.length === 0 && (
        <div className="text-center py-xl text-on-surface-variant font-body-lg">
          No appointments found. Bookings will appear here once submitted.
        </div>
      )}

      {!loading && appointments.length > 0 && (
        <>
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-md mb-lg">
            {[
              { label: "Total", value: appointments.length, color: "bg-surface-container" },
              {
                label: "Pending",
                value: appointments.filter((a) => a.status === "pending").length,
                color: "bg-tertiary-fixed/50",
              },
              {
                label: "Confirmed",
                value: appointments.filter((a) => a.status === "confirmed").length,
                color: "bg-secondary-container/40",
              },
              {
                label: "Cancelled",
                value: appointments.filter((a) => a.status === "cancelled").length,
                color: "bg-error-container/40",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`${stat.color} rounded-xl p-md text-center border border-outline-variant/20`}
              >
                <p className="font-headline-md text-[28px] font-bold text-on-background">{stat.value}</p>
                <p className="font-label-technical text-label-technical text-on-surface-variant uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="bg-surface border border-outline-variant/30 rounded-2xl shadow-soft overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-outline-variant/30">
                  {["Patient", "Phone", "Service", "Doctor", "Date & Time", "Type", "Status"].map(
                    (col) => (
                      <th
                        key={col}
                        className="text-left py-sm px-md font-label-technical text-label-technical text-on-surface-variant uppercase tracking-wider"
                      >
                        {col}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr
                    key={appt.id}
                    className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors"
                  >
                    <td className="py-sm px-md">
                      <div>
                        <p className="font-body-md font-medium text-on-surface">{appt.fullName}</p>
                        <p className="font-body-sm text-outline">
                          {appt.age} yrs | {appt.gender}
                        </p>
                      </div>
                    </td>
                    <td className="py-sm px-md font-body-md text-on-surface-variant">
                      +91 {appt.phone}
                    </td>
                    <td className="py-sm px-md font-body-sm text-on-surface-variant">{appt.service}</td>
                    <td className="py-sm px-md font-body-sm text-on-surface-variant">{appt.doctor}</td>
                    <td className="py-sm px-md">
                      <p className="font-body-sm text-on-surface">{appt.date}</p>
                      <p className="font-label-technical text-label-technical text-outline">{appt.time}</p>
                    </td>
                    <td className="py-sm px-md font-body-sm text-on-surface-variant">{appt.visitType}</td>
                    <td className="py-sm px-md">
                      <span
                        className={`inline-block px-2 py-1 rounded-full font-label-technical text-label-technical capitalize ${
                          STATUS_COLORS[appt.status] ?? "bg-surface-container"
                        }`}
                      >
                        {appt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
