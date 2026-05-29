import type { Metadata } from "next";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";

export const metadata: Metadata = {
  title: "Admin — Shiv Shakti Health Clinic",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthGuard>
      <div style={{ display: "flex", minHeight: "100vh", background: "#F8FAFB" }}>
        <AdminSidebar />
        <main className="admin-main-content" style={{ flex: 1, padding: "32px", minHeight: "100vh", width: "100%" }}>
          {children}
        </main>
        <style>{`
          @media (min-width: 1024px) {
            .admin-main-content { margin-left: 256px; padding-top: 32px; }
          }
          @media (max-width: 1023px) {
            .admin-main-content { margin-left: 0; padding-top: 72px; }
          }
        `}</style>
      </div>
    </AdminAuthGuard>
  );
}
