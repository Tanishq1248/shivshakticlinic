import type { Metadata } from "next";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin — Shiv Shakti Health Clinic",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F8FAFB" }}>
      <AdminSidebar />
      {/*
        The sidebar handles its own layout:
        - Desktop (≥1024px): fixed sidebar, so we need ml-64 (256px)
        - Mobile (<1024px): drawer overlay, no margin needed, just top padding for hamburger
        We use a class-based approach here since this is a server component.
        The sidebar's JS sets isDesktop; the layout uses CSS media query for the margin.
      */}
      <main className="admin-main-content" style={{ flex: 1, padding: "32px", minHeight: "100vh", width: "100%" }}>
        {children}
      </main>
      <style>{`
        @media (min-width: 1024px) {
          .admin-main-content {
            margin-left: 256px;
            padding-top: 32px;
          }
        }
        @media (max-width: 1023px) {
          .admin-main-content {
            margin-left: 0;
            padding-top: 72px; /* space below the fixed hamburger button */
          }
        }
      `}</style>
    </div>
  );
}
