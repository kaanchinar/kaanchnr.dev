import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ToastProvider from "./toast.provider";
import 'react-toastify/dist/ReactToastify.min.css';

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kaan Chinar's Website",
  description: "Kaan Chinar's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.className} bg-Background text-Text dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative`}
      >
        <ToastProvider>
          <Header />
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          {children}
          <Toaster />
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
