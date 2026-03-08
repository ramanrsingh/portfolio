import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Raman Ratnakar Singh — Lead Software Engineer",
  description:
    "Lead Software Engineer specializing in Laravel, PHP, Python, and AI-augmented development. 10+ years of experience from network engineering to full-stack software leadership.",
  keywords: [
    "Raman Ratnakar Singh",
    "Laravel Developer",
    "Lead Software Engineer",
    "PHP Developer",
    "Full Stack Developer",
    "AI Development",
    "Jaipur",
    "India",
  ],
  authors: [{ name: "Raman Ratnakar Singh" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
