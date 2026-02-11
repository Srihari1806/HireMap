import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "HireMap | Campus Placement Intelligence Hub",
  description: "AI-powered campus placement portal. Real-time company tracking, ATS resume analysis, interview prep guides, and personalized career recommendations.",
  keywords: ["hiremap", "placement", "campus recruitment", "2026 batch", "career", "interview prep"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased">
        <Sidebar />
        <main className="lg:ml-[240px] min-h-screen mesh-gradient-1 relative">
          {/* Ambient Orbs */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[rgba(139,92,246,0.06)] blur-[100px] animate-float" />
            <div className="absolute top-1/2 -right-40 w-80 h-80 rounded-full bg-[rgba(6,182,212,0.05)] blur-[100px] animate-float" style={{ animationDelay: "2s" }} />
          </div>
          <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-6 pt-16 lg:pt-6">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
