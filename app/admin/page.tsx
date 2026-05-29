"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  subscribeToAppointments,
  updateAppointmentStatus,
  type Appointment,
} from "@/lib/firestore";

/* ─── Helpers ─── */
type StatusFilter = "all" | "pending" | "confirmed" | "cancelled";

const STATUS_META: Record<
  string,
  { label: string; bg: string; text: string; dot: string }
> = {
  pending: {
    label: "Pending",
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-400",
  },
  confirmed: {
    label: "Confirmed",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-400",
  },
  cancelled: {
    label: "Cancelled",
    bg: "bg-red-50",
    text: "text-red-600",
    dot: "bg-red-400",
  },
};

function todayString() {
  return new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ─── Stat Card ─── */
function StatCard({
  label,
  value,
  color,
  iconColor,
  iconBg,
  icon,
}: {
  label: string;
  value: number;
  color: string;
  iconColor: string;
  iconBg: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 flex justify-between items-start shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-slate-100">
      <div>
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
          {label}
        </p>
        <span className={`text-4xl font-bold ${color}`}>{value}</span>
      </div>
      <div className={`p-2.5 rounded-full ${iconBg} ${iconColor}`}>
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {icon}
        </svg>
      </div>
    </div>
  );
}

/* ─── Status Badge ─── */
function StatusBadge({ status }: { status: string }) {
  const meta = STATUS_META[status] ?? {
    label: status,
    bg: "bg-slate-100",
    text: "text-slate-600",
    dot: "bg-slate-400",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${meta.bg} ${meta.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
      {meta.label}
    </span>
  );
}

/* ─── Action Menu ─── */
function ActionMenu({
  appt,
  onUpdate,
}: {
  appt: Appointment;
  onUpdate: (id: string, status: "pending" | "confirmed" | "cancelled") => void;
}) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  const handle = async (status: "pending" | "confirmed" | "cancelled") => {
    if (!appt.id) return;
    setBusy(true);
    setOpen(false);
    await onUpdate(appt.id, status);
    setBusy(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        disabled={busy}
        className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors disabled:opacity-50"
        aria-label="Actions"
      >
        {busy ? (
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
            <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" className="opacity-75" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-slate-100 z-20 py-1 overflow-hidden">
            {(["confirmed", "pending", "cancelled"] as const)
              .filter((s) => s !== appt.status)
              .map((s) => {
                const meta = STATUS_META[s];
                return (
                  <button
                    key={s}
                    onClick={() => handle(s)}
                    className={`w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm font-medium hover:bg-slate-50 transition-colors ${meta.text}`}
                  >
                    <span className={`w-2 h-2 rounded-full ${meta.dot}`} />
                    Mark {meta.label}
                  </button>
                );
              })}
            <div className="border-t border-slate-100 mt-1 pt-1">
              <a
                href={`https://wa.me/91${appt.phone}?text=Hello+${encodeURIComponent(appt.fullName)}%2C+regarding+your+appointment...`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#25D366] hover:bg-slate-50 transition-colors"
              >
                <svg viewBox="0 0 32 32" className="w-4 h-4 fill-[#25D366]">
                  <path d="M16.002 2.667C8.638 2.667 2.667 8.637 2.667 16c0 2.364.638 4.673 1.85 6.693L2.667 29.333l6.823-1.79A13.284 13.284 0 0 0 16.002 29.333C23.365 29.333 29.333 23.363 29.333 16S23.365 2.667 16.002 2.667Zm0 2.4c5.865 0 10.932 5.069 10.932 10.933 0 5.866-5.067 10.933-10.932 10.933a10.89 10.89 0 0 1-5.545-1.516l-.397-.238-4.05 1.063 1.08-3.945-.26-.413A10.89 10.89 0 0 1 5.069 16c0-5.864 5.069-10.933 10.933-10.933Zm-3.37 5.2c-.22-.001-.46.006-.685.52l-.852 2.07c-.2.487-.757 1.474-.054 2.867.703 1.393 2.183 3.572 4.744 4.826 2.562 1.253 3.14.994 3.698.926.557-.068 1.8-.735 2.054-1.44.254-.706.254-1.31.178-1.435-.076-.127-.28-.203-.586-.355-.306-.152-1.8-.888-2.08-.99-.28-.1-.484-.152-.686.152-.202.306-.782.99-.959 1.192-.177.203-.355.228-.66.076-.307-.152-1.295-.477-2.467-1.523-.912-.814-1.527-1.818-1.705-2.124-.178-.305-.019-.47.133-.62.137-.134.305-.352.457-.528.152-.178.203-.305.305-.508.1-.203.05-.38-.026-.533-.076-.152-.669-1.656-.93-2.262-.244-.585-.497-.523-.684-.53Z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Main Page ─── */
export default function AdminDashboardPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [allAppointments, setAllAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  /* Real-time listener — always listen to ALL, filter client-side for instant tab switches */
  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToAppointments(
      (data) => {
        setAllAppointments(data);
        setLoading(false);
        setError("");
      }
    );
    return () => unsubscribe();
  }, []);

  const handleStatusUpdate = useCallback(
    async (id: string, status: "pending" | "confirmed" | "cancelled") => {
      try {
        await updateAppointmentStatus(id, status);
      } catch {
        alert("Failed to update status. Please try again.");
      }
    },
    []
  );

  /* Derived filtered list */
  const filtered = allAppointments.filter((a) => {
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      a.fullName.toLowerCase().includes(q) ||
      a.phone.includes(q) ||
      a.service.toLowerCase().includes(q) ||
      a.doctor.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const todayStr = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const todayAppointments = allAppointments.filter((a) => a.date === todayStr);

  const stats = {
    total: todayAppointments.length,
    pending: todayAppointments.filter((a) => a.status === "pending").length,
    confirmed: todayAppointments.filter((a) => a.status === "confirmed").length,
    cancelled: todayAppointments.filter((a) => a.status === "cancelled").length,
  };

  return (
    <div className="w-full">

        {/* ── Header ── */}
        <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
          <div>
            <h2
              className="text-3xl font-bold text-slate-900"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Today&apos;s Appointments
            </h2>
            <p className="text-slate-500 mt-1 text-base">{todayString()}</p>
          </div>
          {/* Actions row: Referrals button + Search */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Referrals shortcut */}
            <Link
              href="/admin/referrals"
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
              style={{ background: "linear-gradient(90deg, #1b4f8a 0%, #0E4D4D 100%)" }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
              View Referrals
            </Link>

            {/* Search */}
            <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            <input
              type="text"
              placeholder="Search patient, service…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0E4D4D]/30 w-64 shadow-sm"
            />
            </div>
          </div>
        </header>

        {/* ── Stats Row ── */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <StatCard
            label="Total Active"
            value={stats.total}
            color="text-[#0E4D4D]"
            iconBg="bg-slate-50"
            iconColor="text-slate-400"
            icon={
              <path
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            }
          />
          <StatCard
            label="Upcoming"
            value={stats.pending}
            color="text-[#1B4F8A]"
            iconBg="bg-blue-50"
            iconColor="text-blue-300"
            icon={
              <path
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            }
          />
          <StatCard
            label="Completed"
            value={stats.confirmed}
            color="text-[#0E4D4D]"
            iconBg="bg-emerald-50"
            iconColor="text-emerald-300"
            icon={
              <path
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            }
          />
          <StatCard
            label="Cancelled"
            value={stats.cancelled}
            color="text-red-600"
            iconBg="bg-red-50"
            iconColor="text-red-300"
            icon={
              <path
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            }
          />
        </section>

        {/* ── Schedule Overview ── */}
        <section className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="font-bold text-lg text-slate-800">Schedule Overview</h3>
            <div className="flex items-center gap-2 flex-wrap">
              {(["all", "pending", "confirmed", "cancelled"] as StatusFilter[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide transition-colors ${
                    statusFilter === s
                      ? "bg-[#0E4D4D] text-white"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {s}
                  {s !== "all" && (
                    <span className="ml-1 opacity-70">
                      ({allAppointments.filter((a) => a.status === s).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex-1 flex items-center justify-center py-20 gap-3 text-slate-400">
              <div className="w-7 h-7 border-[3px] border-[#0E4D4D] border-t-transparent rounded-full animate-spin" />
              <span className="text-sm font-medium">Loading appointments…</span>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="flex-1 flex flex-col items-center justify-center py-20 gap-2 text-red-500">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              </svg>
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filtered.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
              <svg className="w-14 h-14 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
              </svg>
              <p className="text-base font-medium">No appointments found matching filters.</p>
            </div>
          )}

          {/* Table */}
          {!loading && !error && filtered.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-slate-100">
                    {["Patient", "Phone", "Service", "Doctor", "Date & Time", "Type", "Status", ""].map(
                      (col) => (
                        <th
                          key={col}
                          className="text-left py-3 px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider"
                        >
                          {col}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((appt) => (
                    <tr
                      key={appt.id}
                      className="border-b border-slate-50 hover:bg-slate-50/70 transition-colors"
                    >
                      {/* Patient */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#0E4D4D]/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-[#0E4D4D] font-bold text-sm">
                              {appt.fullName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800 text-sm">{appt.fullName}</p>
                            <p className="text-xs text-slate-400">
                              {appt.age} yrs · {appt.gender}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="py-4 px-5 text-sm text-slate-500">+91 {appt.phone}</td>

                      {/* Service */}
                      <td className="py-4 px-5">
                        <span className="text-sm text-slate-700 font-medium">{appt.service}</span>
                      </td>

                      {/* Doctor */}
                      <td className="py-4 px-5 text-sm text-slate-500">{appt.doctor}</td>

                      {/* Date & Time */}
                      <td className="py-4 px-5">
                        <p className="text-sm text-slate-800 font-medium">{appt.date}</p>
                        <p className="text-xs text-slate-400">{appt.time}</p>
                      </td>

                      {/* Type */}
                      <td className="py-4 px-5">
                        <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-md font-medium">
                          {appt.visitType}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-5">
                        <StatusBadge status={appt.status} />
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5">
                        <ActionMenu appt={appt} onUpdate={handleStatusUpdate} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Footer row count */}
              <div className="px-5 py-3 border-t border-slate-100 text-xs text-slate-400 font-medium">
                Showing {filtered.length} of {allAppointments.length} appointments
              </div>
            </div>
          )}
        </section>
    </div>
  );
}
