"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const ADMIN_PASSWORD = "Admin@123";
const SESSION_KEY = "shivshakti_admin_auth";

export function useAdminTrigger() {
  const router = useRouter();
  const tapCount = useRef(0);
  const tapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  /* ── Ctrl + Shift + A (desktop) ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        e.preventDefault();
        // If already authenticated go straight in
        if (sessionStorage.getItem(SESSION_KEY) === "true") {
          router.push("/admin");
        } else {
          setShowPasswordModal(true);
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router]);

  /* Triple-tap handler — call this from the logo's onTouchEnd */
  const handleLogoTap = () => {
    tapCount.current += 1;
    if (tapTimer.current) clearTimeout(tapTimer.current);
    tapTimer.current = setTimeout(() => { tapCount.current = 0; }, 600);

    if (tapCount.current >= 3) {
      tapCount.current = 0;
      if (tapTimer.current) clearTimeout(tapTimer.current);
      if (sessionStorage.getItem(SESSION_KEY) === "true") {
        router.push("/admin");
      } else {
        setShowPasswordModal(true);
      }
    }
  };

  return { showPasswordModal, setShowPasswordModal, handleLogoTap };
}

/* ── Password Modal ── */
export function AdminPasswordModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwd === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "true");
      onSuccess();
    } else {
      setError("Incorrect password. Please try again.");
      setPwd("");
      inputRef.current?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full  p-7 z-10 animate-[adminSlideIn_0.2s_ease-out]">
        {/* Lock icon */}
        <div className="w-14 h-14 rounded-full bg-primary-container/20 flex items-center justify-center mx-auto mb-4">
          <span
            className="material-symbols-outlined text-primary-container text-[28px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            lock
          </span>
        </div>

        <h2
          className="text-xl font-bold text-center text-slate-800 mb-1"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Admin Access
        </h2>
        <p className="text-sm text-center text-slate-500 mb-6">
          Enter the admin password to continue.
        </p>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <div className="relative">
            <input
              ref={inputRef}
              type={show ? "text" : "password"}
              value={pwd}
              onChange={(e) => { setPwd(e.target.value); setError(""); }}
              placeholder="Password"
              className="w-full px-4 py-3 pr-11 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E4D4D]/30 bg-slate-50"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              aria-label="Toggle password visibility"
            >
              <span className="material-symbols-outlined text-[20px]">
                {show ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-xs font-medium text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 text-sm font-bold text-white rounded-xl transition-all hover:opacity-90 active:scale-95"
            style={{ background: "linear-gradient(90deg, #1b4f8a 0%, #0E4D4D 100%)" }}
          >
            Enter Dashboard
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 text-sm font-medium text-slate-500 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
        </form>
      </div>

      <style>{`
        @keyframes adminSlideIn {
          from { transform: translateY(-16px) scale(0.97); opacity: 0; }
          to   { transform: translateY(0)      scale(1);    opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* ── Auth Guard — wraps all /admin pages ── */
const SESSION_KEY_GUARD = "shivshakti_admin_auth";

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authed, setAuthed] = useState<boolean | null>(null); // null = checking
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const ok = sessionStorage.getItem(SESSION_KEY_GUARD) === "true";
    setAuthed(ok);
    if (!ok) setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwd === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY_GUARD, "true");
      setAuthed(true);
    } else {
      setError("Incorrect password. Please try again.");
      setPwd("");
      inputRef.current?.focus();
    }
  };

  /* Still checking */
  if (authed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFB]">
        <div className="w-8 h-8 border-[3px] border-[#0E4D4D] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  /* Authenticated — show admin content */
  if (authed) return <>{children}</>;

  /* Not authenticated — show full-page password screen */
  return (
    <div className="min-h-screen bg-[#F8FAFB] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full  p-8">
        {/* Lock icon */}
        <div className="w-16 h-16 rounded-full bg-[#0E4D4D]/10 flex items-center justify-center mx-auto mb-5">
          <span
            className="material-symbols-outlined text-[#0E4D4D] text-[32px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            lock
          </span>
        </div>

        <h1
          className="text-2xl font-bold text-center text-[#0E4D4D] mb-1"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Shiv Shakti Admin
        </h1>
        <p className="text-sm text-center text-slate-500 mb-7">
          Enter your admin password to access the dashboard.
        </p>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <div className="relative">
            <input
              ref={inputRef}
              type={show ? "text" : "password"}
              value={pwd}
              onChange={(e) => { setPwd(e.target.value); setError(""); }}
              placeholder="Admin Password"
              className="w-full px-4 py-3 pr-11 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E4D4D]/30 bg-slate-50"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              aria-label="Toggle visibility"
            >
              <span className="material-symbols-outlined text-[20px]">
                {show ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-xs font-medium text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 text-sm font-bold text-white rounded-xl hover:opacity-90 active:scale-95 transition-all"
            style={{ background: "linear-gradient(90deg, #1b4f8a 0%, #0E4D4D 100%)" }}
          >
            Enter Dashboard
          </button>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="w-full py-2.5 text-sm font-medium text-slate-500 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
          >
            ← Back to Site
          </button>
        </form>
      </div>
    </div>
  );
}
