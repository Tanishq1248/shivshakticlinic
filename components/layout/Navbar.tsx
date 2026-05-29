"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { AdminPasswordModal, useAdminTrigger } from "@/components/admin/AdminAuthGuard";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/doctors", label: "Doctors" },
  { href: "/appointment", label: "Appointments" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { showPasswordModal, setShowPasswordModal, handleLogoTap } = useAdminTrigger();

  return (
    <>
      {/* Password modal triggered by shortcut */}
      {showPasswordModal && (
        <AdminPasswordModal
          onClose={() => setShowPasswordModal(false)}
          onSuccess={() => {
            setShowPasswordModal(false);
            router.push("/admin");
          }}
        />
      )}

      <nav className="bg-surface/70 backdrop-blur-md border-b border-outline-variant/30 shadow-sm w-full top-0 sticky z-50 transition-all duration-300">
        <div className="flex justify-between items-center w-full px-lg max-w-container-max mx-auto h-20">
          {/* Brand — triple tap on mobile = admin shortcut */}
          <Link
            href="/"
            className="flex items-center gap-sm cursor-pointer group"
            onTouchEnd={(e) => {
              // Don't intercept navigation on single tap
              handleLogoTap();
            }}
          >
            <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <span
                className="material-symbols-outlined text-on-primary-container"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_hospital
              </span>
            </div>
            <span className="font-headline-sm text-headline-sm font-bold text-primary tracking-tight">
              Shiv Shakti Health Clinic
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-lg">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  pathname === link.href
                    ? "text-secondary font-bold border-b-2 border-secondary pb-1 transition-all duration-300"
                    : "text-on-surface-variant font-body-md hover:text-secondary transition-all duration-300"
                }
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Book Now CTA */}
          <Link
            href="/appointment"
            className="hidden md:flex items-center justify-center rounded-full btn-gradient text-on-primary px-lg py-sm font-button text-button shadow-sm hover:shadow-md hover:opacity-90 active:scale-95 transition-all duration-200"
          >
            Book Now
          </Link>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-primary p-xs rounded-lg hover:bg-surface-variant transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-72 bg-surface shadow-2xl flex flex-col p-md">
            <div className="flex justify-between items-center mb-lg">
              <div>
                <h2 className="font-headline-sm text-headline-sm text-primary">Shiv Shakti</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Health Clinic</p>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-on-surface-variant hover:text-primary"
                aria-label="Close menu"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <nav className="flex flex-col gap-xs flex-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-sm p-3 rounded-lg transition-colors ${
                    pathname === link.href
                      ? "bg-primary-container/20 text-primary font-bold"
                      : "text-on-surface-variant hover:bg-surface-variant"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/appointment"
              onClick={() => setMobileOpen(false)}
              className="btn-gradient text-on-primary font-button text-button px-md py-sm rounded-full w-full mt-auto text-center"
            >
              Book Now
            </Link>
          </aside>
        </div>
      )}
    </>
  );
}
