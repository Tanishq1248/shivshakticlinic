import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFAB from "@/components/layout/WhatsAppFAB";

export const metadata: Metadata = {
  title: {
    default: "Shiv Shakti Health Clinic — Expert Care in Pimpri Chinchwad",
    template: "%s | Shiv Shakti Health Clinic",
  },
  description:
    "Consult experienced BHMS & BAMS doctors for general checkups, gynecology, homoeopathic treatment & more. Serving Pimpri Chinchwad with compassion and precision.",
  keywords: [
    "clinic pimpri chinchwad",
    "homoeopathy doctor pune",
    "bhms doctor",
    "bams ayurveda",
    "health clinic pune",
    "general checkup",
    "gynecology clinic",
    "Shiv Shakti",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Shiv Shakti Health Clinic",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=Playfair+Display:wght@600;700&family=Space+Mono:wght@500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface text-on-surface font-body-md relative overflow-x-hidden min-h-screen flex flex-col">
        {/* Global Background Mesh */}
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-primary-fixed/40 rounded-full blur-[120px] opacity-70" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary-container/30 rounded-full blur-[100px] opacity-60" />
        </div>

        <Navbar />
        <main className="flex-grow flex flex-col w-full relative">
          {children}
        </main>
        <Footer />
        <WhatsAppFAB />
      </body>
    </html>
  );
}
