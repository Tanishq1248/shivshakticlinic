"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  {
    href: "/admin",
    label: "Appointments",
    icon: (
      <path
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    ),
  },
  {
    href: "/admin/referrals",
    label: "Referrals",
    icon: (
      <path
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    ),
  },
];

/* ── Reusable sidebar body ── */
function SidebarBody({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Logo */}
      <div style={{ padding: "28px 28px 20px" }}>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "22px",
            fontWeight: 700,
            color: "#0E4D4D",
            lineHeight: 1.25,
            letterSpacing: "-0.5px",
            margin: 0,
          }}
        >
          Shiv Shakti
        </h1>
        <p
          style={{
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "#94a3b8",
            fontWeight: 600,
            marginTop: "4px",
          }}
        >
          Health Clinic
        </p>
      </div>

      {/* Nav links */}
      <nav style={{ flex: 1, padding: "0 12px" }}>
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "11px 16px",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: 500,
                marginBottom: "4px",
                textDecoration: "none",
                transition: "background 0.15s, color 0.15s",
                background: active ? "#0E4D4D" : "transparent",
                color: active ? "#fff" : "#64748b",
              }}
            >
              <svg
                style={{ width: 20, height: 20, flexShrink: 0 }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {item.icon}
              </svg>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Public site link */}
      <div style={{ padding: "12px", borderTop: "1px solid #f1f5f9" }}>
        <Link
          href="/"
          onClick={onNavigate}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "8px 16px",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: 500,
            color: "#64748b",
            textDecoration: "none",
          }}
        >
          <svg style={{ width: 20, height: 20 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
          Public Site
        </Link>
      </div>
    </div>
  );
}

/* ── Hamburger icon ── */
function HamburgerIcon() {
  return (
    <svg style={{ width: 22, height: 22 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    </svg>
  );
}

/* ── Close icon ── */
function CloseIcon() {
  return (
    <svg style={{ width: 20, height: 20 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    </svg>
  );
}

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const pathname = usePathname();

  /* Detect screen size */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* Close drawer on route change */
  useEffect(() => { setOpen(false); }, [pathname]);

  /* Lock body scroll when drawer is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* ── Desktop fixed sidebar ── */
  if (isDesktop) {
    return (
      <aside
        style={{
          width: 256,
          background: "#fff",
          borderRight: "1px solid #f1f5f9",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          left: 0,
          height: "100%",
          zIndex: 30,
          boxShadow: "2px 0 8px rgba(0,0,0,0.04)",
        }}
      >
        <SidebarBody />
      </aside>
    );
  }

  /* ── Mobile: hamburger button + drawer ── */
  return (
    <>
      {/* Hamburger button — always visible on mobile */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        style={{
          position: "fixed",
          top: 14,
          left: 14,
          zIndex: 40,
          width: 42,
          height: 42,
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: 10,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#475569",
        }}
      >
        <HamburgerIcon />
      </button>

      {/* Drawer overlay */}
      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
          }}
        >
          {/* Backdrop */}
          <div
            onClick={() => setOpen(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(15, 23, 42, 0.45)",
              backdropFilter: "blur(4px)",
            }}
          />

          {/* Drawer panel */}
          <aside
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: 280,
              background: "#fff",
              boxShadow: "4px 0 24px rgba(0,0,0,0.12)",
              zIndex: 10,
              animation: "adminSlideIn 0.22s ease-out both",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                border: "none",
                background: "transparent",
                cursor: "pointer",
                color: "#94a3b8",
              }}
            >
              <CloseIcon />
            </button>

            <SidebarBody onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      {/* Inline keyframe so it always works regardless of globals.css */}
      <style>{`
        @keyframes adminSlideIn {
          from { transform: translateX(-100%); opacity: 0; }
          to   { transform: translateX(0);     opacity: 1; }
        }
      `}</style>
    </>
  );
}
