import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface-container-low w-full py-xl border-t border-outline-variant/30 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-container-max mx-auto px-lg gap-md">
        {/* Brand */}
        <div>
          <div className="font-headline-sm text-headline-sm font-bold text-primary mb-xs">
            Shiv Shakti Health Clinic
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Healing with Divine Care — Pimpri Chinchwad
          </p>
          {/* Social links */}
          <div className="flex gap-sm mt-sm">
            <a
              href="https://wa.me/919673709322"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-9 h-9 rounded-full border border-outline-variant/30 flex items-center justify-center text-outline hover:text-secondary hover:border-secondary hover:bg-secondary/5 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full border border-outline-variant/30 flex items-center justify-center text-outline hover:text-secondary hover:border-secondary hover:bg-secondary/5 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">thumb_up</span>
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-outline-variant/30 flex items-center justify-center text-outline hover:text-secondary hover:border-secondary hover:bg-secondary/5 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">photo_camera</span>
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {[
            { href: "/", label: "Home" },
            { href: "/services", label: "Services" },
            { href: "/doctors", label: "Doctors" },
            { href: "/appointment", label: "Appointments" },
            { href: "/contact", label: "Contact" },
            { href: "/blog", label: "Health Tips" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-on-surface-variant hover:text-secondary transition-colors font-body-sm text-body-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Legal */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          {["Privacy Policy", "Terms of Service", "Patient Portal", "Emergency Support"].map((label) => (
            <a
              key={label}
              href="#"
              className="text-on-surface-variant hover:text-secondary transition-colors font-body-sm text-body-sm"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom strip */}
      <div className="mt-xl pt-4 border-t border-outline-variant/20 bg-primary/5">
        <p className="text-center font-body-sm text-body-sm text-primary">
          © 2025 Shiv Shakti Health Clinic — All rights reserved.
        </p>
      </div>
    </footer>
  );
}
