import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hyundai",
  description: "Hyundai Motor Company",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={`${urbanist.className} antialiased`}>
        <SessionProvider session={session}>
          <Navbar />
          <main className="bg-gray-50 min-h-screen">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
