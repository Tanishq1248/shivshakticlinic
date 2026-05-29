"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { testimonials } from "@/lib/data/testimonials";

/* ── Google "G" multicolour logo ── */
function GoogleGLogo({ size = 28 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      aria-label="Google"
    >
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

/* ── Star row ── */
function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-[3px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`w-5 h-5 ${i < count ? "text-[#F5A623]" : "text-gray-300"}`}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.955c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.95 2.874c-.784.57-1.838-.197-1.539-1.118l1.285-3.955a1 1 0 00-.364-1.118L2.063 9.382c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.951-.69L9.049 2.927z" />
        </svg>
      ))}
    </div>
  );
}

/* ── Avatar initials circle ── */
function Avatar({ name, photo }: { name: string; photo: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-primary-container flex items-center justify-center">
      {photo ? (
        <Image src={photo} alt={name} fill className="object-cover" unoptimized />
      ) : (
        <span className="text-on-primary font-bold text-lg">{initials}</span>
      )}
    </div>
  );
}

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  const t = testimonials[current];
  const initials = t.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="w-full flex flex-col items-center gap-6">

      {/* ── Google Rating Badge ── */}
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-0 bg-white border border-outline-variant/30 rounded-2xl px-6 py-4 shadow-sm w-full max-w-2xl">
        {/* Left: G logo + score + stars */}
        <div className="flex items-center gap-3 flex-1">
          <GoogleGLogo size={32} />
          <div>
            <p className="font-bold text-on-background text-[15px] leading-tight">Google Rating</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-bold text-on-background text-[15px]">4.9 / 5.0</span>
              <Stars count={5} />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-10 bg-outline-variant/30 mx-4" />

        {/* Right: label */}
        <div className="text-center sm:text-left">
          <p className="text-on-surface-variant text-sm font-medium">Verified Patient Reviews</p>
          <p className="text-secondary text-sm font-semibold mt-0.5">Based on 350+ reviews</p>
        </div>
      </div>

      {/* ── Carousel ── */}
      <div className="relative flex items-center w-full max-w-2xl">
        {/* Prev Button */}
        <button
          onClick={prev}
          aria-label="Previous review"
          className="absolute -left-5 sm:-left-14 z-10 w-10 h-10 rounded-full bg-white border border-outline-variant/30 shadow-md flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-colors flex-shrink-0"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Card */}
        <div className="w-full bg-white border border-outline-variant/20 rounded-2xl p-6 sm:p-8 shadow-sm mx-auto transition-all duration-300">
          {/* Top row: stars + Google logo */}
          <div className="flex items-start justify-between mb-4">
            <Stars count={t.rating ?? 5} />
            <GoogleGLogo size={24} />
          </div>

          {/* Quote */}
          <p className="font-body-lg text-[16px] sm:text-[17px] italic text-on-surface-variant leading-relaxed mb-6">
            &ldquo;{t.quote}&rdquo;
          </p>

          {/* Author row */}
          <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/20">
            {/* Avatar */}
            <div className="w-11 h-11 rounded-full bg-primary-container/30 border border-primary-container/40 flex items-center justify-center flex-shrink-0 overflow-hidden relative">
              <span className="font-bold text-primary text-base">{initials}</span>
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-bold text-on-background text-[15px] leading-tight">{t.name}</p>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                <span className="text-on-surface-variant text-sm">{t.role}</span>
                {t.verified && (
                  <>
                    <span className="text-outline-variant text-xs">•</span>
                    <span className="flex items-center gap-1 text-secondary text-sm font-medium">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-secondary" aria-hidden="true">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-secondary" />
                        <path fillRule="evenodd" d="M12 2a10 10 0 100 20A10 10 0 0012 2zm-1 14.41l-3.7-3.7 1.41-1.42L11 13.59l5.29-5.3 1.42 1.42L11 16.41z" />
                      </svg>
                      Verified
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={next}
          aria-label="Next review"
          className="absolute -right-5 sm:-right-14 z-10 w-10 h-10 rounded-full bg-white border border-outline-variant/30 shadow-md flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-colors flex-shrink-0"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* ── Dot Pagination ── */}
      <div className="flex items-center gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to review ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 h-2.5 bg-secondary"
                : "w-2.5 h-2.5 bg-outline-variant/50 hover:bg-outline"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
