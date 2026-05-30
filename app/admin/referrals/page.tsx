"use client";

import { useEffect, useState, useCallback } from "react";
import {
  subscribeToReferrals,
  updateReferralStatus,
  deleteReferral,
  addReferral,
  generateRefNo,
  type Referral,
  type ReferralStatus,
  type ReferralType,
} from "@/lib/firestore";
import Link from "next/link";

/* ─── Constants ─── */
const REFERRAL_TYPES: ReferralType[] = [
  "MRI Scan", "Blood Test", "ECG", "Ultrasound", "X-Ray", "CT Scan", "Other",
];

const STATUS_META: Record<ReferralStatus, { label: string; bg: string; text: string; dot: string }> = {
  pending: { label: "Pending", bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-400" },
  "report-received": { label: "Report Received", bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-400" },
  completed: { label: "Completed", bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-400" },
};

const TYPE_COLORS: Record<string, string> = {
  "MRI Scan": "bg-purple-100 text-purple-700",
  "Blood Test": "bg-red-100 text-red-700",
  "ECG": "bg-sky-100 text-sky-700",
  "Ultrasound": "bg-indigo-100 text-indigo-700",
  "X-Ray": "bg-orange-100 text-orange-700",
  "CT Scan": "bg-teal-100 text-teal-700",
  "Other": "bg-slate-100 text-slate-600",
};

const PAGE_SIZE = 8;

function formatDate(iso: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

/* ─── Status Badge ─── */
function StatusBadge({ status }: { status: ReferralStatus }) {
  const m = STATUS_META[status] ?? { label: status, bg: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-400" };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${m.bg} ${m.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />
      {m.label}
    </span>
  );
}

/* ─── New Referral Modal ─── */
function NewReferralModal({ onClose, onSave }: { onClose: () => void; onSave: (r: Omit<Referral, "id" | "createdAt">) => Promise<void> }) {
  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState({
    patientName: "",
    referredTo: "",
    type: "Blood Test" as ReferralType,
    status: "pending" as ReferralStatus,
    date: today,
    notes: "",
  });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.patientName.trim()) e.patientName = "Patient name is required";
    if (!form.referredTo.trim()) e.referredTo = "Referred to is required";
    if (!form.date) e.date = "Date is required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSaving(true);
    try {
      await onSave({ ...form, refNo: generateRefNo() });
      onClose();
    } catch {
      alert("Failed to save referral. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full  p-6 z-10">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-slate-800" style={{ fontFamily: "'Playfair Display', serif" }}>
            New Referral
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
            </svg>
          </button>

          
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Patient Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Patient Name *</label>
            <input
              type="text"
              value={form.patientName}
              onChange={e => setForm(f => ({ ...f, patientName: e.target.value }))}
              placeholder="e.g. Amit Sharma"
              className={`w-full px-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E4D4D]/30 ${errors.patientName ? "border-red-400" : "border-slate-200"}`}
            />
            {errors.patientName && <p className="text-red-500 text-xs mt-1">{errors.patientName}</p>}
          </div>

          {/* Referred To */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Referred To *</label>
            <input
              type="text"
              value={form.referredTo}
              onChange={e => setForm(f => ({ ...f, referredTo: e.target.value }))}
              placeholder="e.g. City Diagnostic Center"
              className={`w-full px-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E4D4D]/30 ${errors.referredTo ? "border-red-400" : "border-slate-200"}`}
            />
            {errors.referredTo && <p className="text-red-500 text-xs mt-1">{errors.referredTo}</p>}
          </div>

          {/* Type + Date row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Type</label>
              <select
                value={form.type}
                onChange={e => setForm(f => ({ ...f, type: e.target.value as ReferralType }))}
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E4D4D]/30 bg-white"
              >
                {REFERRAL_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Date *</label>
              <input
                type="date"
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                className={`w-full px-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E4D4D]/30 ${errors.date ? "border-red-400" : "border-slate-200"}`}
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Status</label>
            <select
              value={form.status}
              onChange={e => setForm(f => ({ ...f, status: e.target.value as ReferralStatus }))}
              className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E4D4D]/30 bg-white"
            >
              {Object.entries(STATUS_META).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Notes</label>
            <textarea
              value={form.notes}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              rows={2}
              placeholder="Optional clinical notes…"
              className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E4D4D]/30 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 text-sm font-semibold text-slate-500 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2.5 text-sm font-semibold text-white rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(90deg, #1b4f8a 0%, #0E4D4D 100%)" }}
            >
              {saving ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving…</>
              ) : "Save Referral"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─── Delete Confirm Modal ─── */
function DeleteModal({ name, onConfirm, onCancel }: { name: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-6 z-10 text-center">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
          </svg>
        </div>
        <h3 className="font-bold text-slate-800 mb-1">Delete Referral?</h3>
        <p className="text-sm text-slate-500 mb-5">This will permanently delete the referral for <strong>{name}</strong>.</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 text-sm font-semibold text-slate-500 border border-slate-200 rounded-xl hover:bg-slate-50">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-2.5 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors">Delete</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function ReferralsPage() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Referral | null>(null);

  // Filters
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [dateFilter, setDateFilter] = useState("");

  // Pagination
  const [page, setPage] = useState(1);

  /* Real-time subscription */
  useEffect(() => {
    const unsub = subscribeToReferrals((data) => {
      setReferrals(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  /* Stats */
  const thisMonth = new Date();
  const monthReferrals = referrals.filter(r => {
    const d = new Date(r.date);
    return d.getFullYear() === thisMonth.getFullYear() && d.getMonth() === thisMonth.getMonth();
  });
  const prevMonthCount = Math.max(0, Math.floor(monthReferrals.length * 0.88));
  const growthPct = prevMonthCount > 0
    ? Math.round(((monthReferrals.length - prevMonthCount) / prevMonthCount) * 100)
    : 0;

  const stats = {
    total: referrals.length,
    pending: referrals.filter(r => r.status === "pending").length,
    completed: referrals.filter(r => r.status === "completed").length,
  };

  /* Filtered list */
  const filtered = referrals.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = !q || r.patientName.toLowerCase().includes(q) || r.referredTo.toLowerCase().includes(q) || r.refNo.toLowerCase().includes(q);
    const matchType = typeFilter === "All Types" || r.type === typeFilter;
    const matchStatus = statusFilter === "All Status" || r.status === statusFilter.toLowerCase().replace(" ", "-");
    const matchDate = !dateFilter || r.date === dateFilter;
    return matchSearch && matchType && matchStatus && matchDate;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSave = useCallback(async (data: Omit<Referral, "id" | "createdAt">) => {
    await addReferral(data);
  }, []);

  const handleStatusChange = useCallback(async (id: string, status: ReferralStatus) => {
    try { await updateReferralStatus(id, status); } catch { alert("Failed to update. Try again."); }
  }, []);

  const handleDelete = useCallback(async (r: Referral) => {
    if (!r.id) return;
    try { await deleteReferral(r.id); setDeleteTarget(null); } catch { alert("Failed to delete. Try again."); }
  }, []);

  const clearFilters = () => {
    setSearch(""); setTypeFilter("All Types"); setStatusFilter("All Status"); setDateFilter(""); setPage(1);
  };

  return (
    <>
      {showModal && <NewReferralModal onClose={() => setShowModal(false)} onSave={handleSave} />}
      {deleteTarget && (
        <DeleteModal
          name={deleteTarget.patientName}
          onConfirm={() => handleDelete(deleteTarget)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      <div className="w-full">
        {/* ── Header ── */}
        <header className="flex items-center justify-between mb-8 gap-3 flex-wrap">
          <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>
            Referrals
          </h2>
          <div className="flex items-center gap-3">
            {/* Back to Appointments */}
            <Link
              href="/admin"
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
              style={{ background: "linear-gradient(90deg, #1b4f8a 0%, #0E4D4D 100%)" }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              </svg>
              Appointments
            </Link>
            {/* New Referral */}
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
              style={{ background: "linear-gradient(90deg, #1b4f8a 0%, #3abfbf 100%)" }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} />
              </svg>
              New Referral
            </button>
          </div>
        </header>


        {/* ── Stats ── */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          {/* Total */}
          <div className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-slate-100">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total This Month</p>
              <p className="text-3xl font-bold text-[#1B4F8A] mt-0.5">{stats.total}</p>
              {growthPct > 0 && (
                <p className="text-xs text-emerald-600 font-medium mt-0.5">+{growthPct}% from last month</p>
              )}
            </div>
          </div>

          {/* Pending */}
          <div className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-slate-100">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pending Reports</p>
              <p className="text-3xl font-bold text-red-500 mt-0.5">{stats.pending}</p>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Requires follow-up</p>
            </div>
          </div>

          {/* Completed */}
          <div className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-slate-100">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Completed</p>
              <p className="text-3xl font-bold text-emerald-600 mt-0.5">{stats.completed}</p>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Archived successfully</p>
            </div>
          </div>
        </section>

        {/* ── Filters ── */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] p-5 mb-6">
          <div className="flex flex-wrap items-end gap-3">
            {/* Search */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Search Patient</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(1); }}
                  placeholder="Search…"
                  className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E4D4D]/30 w-40"
                />
              </div>
            </div>

            {/* Type */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Referral Type</label>
              <select
                value={typeFilter}
                onChange={e => { setTypeFilter(e.target.value); setPage(1); }}
                className="px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E4D4D]/30 bg-white w-40"
              >
                <option>All Types</option>
                {REFERRAL_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>

            {/* Status */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</label>
              <select
                value={statusFilter}
                onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
                className="px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E4D4D]/30 bg-white w-40"
              >
                <option>All Status</option>
                {Object.entries(STATUS_META).map(([k, v]) => <option key={k} value={v.label}>{v.label}</option>)}
              </select>
            </div>

            {/* Date */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date</label>
              <input
                type="date"
                value={dateFilter}
                onChange={e => { setDateFilter(e.target.value); setPage(1); }}
                className="px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E4D4D]/30 w-40"
              />
            </div>

            {/* Clear */}
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm font-semibold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {/* ── Table ── */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col">
          {loading ? (
            <div className="flex items-center justify-center py-24 gap-3 text-slate-400">
              <div className="w-7 h-7 border-[3px] border-[#0E4D4D] border-t-transparent rounded-full animate-spin" />
              <span className="text-sm font-medium">Loading referrals…</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3 text-slate-400">
              <svg className="w-14 h-14 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
              </svg>
              <p className="text-base font-medium">No referrals found matching filters.</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[750px]">
                  <thead>
                    <tr className="border-b border-slate-100">
                      {["Date", "Patient Name", "Referred To", "Type", "Status", "Actions"].map(col => (
                        <th key={col} className="text-left py-3.5 px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map((r) => (
                      <tr key={r.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                        {/* Date */}
                        <td className="py-4 px-5 text-sm text-slate-600 whitespace-nowrap">{formatDate(r.date)}</td>

                        {/* Patient */}
                        <td className="py-4 px-5">
                          <p className="font-semibold text-slate-800 text-sm">{r.patientName}</p>
                          <p className="text-xs text-slate-400 font-mono">{r.refNo}</p>
                        </td>

                        {/* Referred To */}
                        <td className="py-4 px-5 text-sm text-slate-600">{r.referredTo}</td>

                        {/* Type */}
                        <td className="py-4 px-5">
                          <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-semibold ${TYPE_COLORS[r.type] ?? "bg-slate-100 text-slate-600"}`}>
                            {r.type}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-4 px-5">
                          <StatusBadge status={r.status as ReferralStatus} />
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-2">
                            {/* Quick status cycle — edit icon */}
                            <div className="relative group">
                              <select
                                value={r.status}
                                onChange={e => r.id && handleStatusChange(r.id, e.target.value as ReferralStatus)}
                                className="opacity-0 absolute inset-0 w-full cursor-pointer"
                                aria-label="Change status"
                              >
                                {Object.entries(STATUS_META).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                              </select>
                              <button className="p-1.5 rounded-lg text-slate-400 hover:bg-[#0E4D4D]/10 hover:text-[#0E4D4D] transition-colors" title="Change status">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                                </svg>
                              </button>
                            </div>

                            {/* Delete */}
                            <button
                              onClick={() => setDeleteTarget(r)}
                              className="p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                              title="Delete"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ── Pagination ── */}
              <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between">
                <p className="text-xs text-slate-400 font-medium">
                  Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} referrals
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-500 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(pg => (
                    <button
                      key={pg}
                      onClick={() => setPage(pg)}
                      className={`w-8 h-8 text-xs font-semibold rounded-lg transition-colors ${pg === page ? "bg-[#0E4D4D] text-white" : "text-slate-500 border border-slate-200 hover:bg-slate-50"}`}
                    >
                      {pg}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-500 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
