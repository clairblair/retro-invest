import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

export const metadata: Metadata = {
  title: "Investment Platform",
  description: "A modern investment platform for managing your investments.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-gray-50 font-sans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
