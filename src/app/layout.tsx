import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/components/LangProvider";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Suzuki Data Analysis Dashboard",
  description: "تحليل بيانات شركة سوزوكي - مشروع تخرج | Suzuki Data Analysis - Graduation Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#f0f4f8]">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
