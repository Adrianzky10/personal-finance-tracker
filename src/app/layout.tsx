import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { QueryProviders } from "@/providers/QueryProviders";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "FinTrack",
    template: "%s | FinTrack",
  },
  description: "Aplikasi pencatatan keuangan pribadi.",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="id" className={cn("font-sans", inter.variable)}>
      <body className="bg-app-background text-text-primary min-h-screen flex flex-col antialiased">
        <QueryProviders>{children}</QueryProviders>
        <Toaster richColors position="top-right" duration={4000} />
      </body>
    </html>
  );
}
