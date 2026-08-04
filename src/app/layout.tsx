import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { QueryProviders } from "@/providers/QueryProviders";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/ThemeProvider";

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
    <html
      lang="id"
      className={cn("font-sans", inter.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col antialiased">
        <QueryProviders>
          <ThemeProvider>{children}</ThemeProvider>
        </QueryProviders>
        <Toaster richColors position="top-right" duration={4000} />
      </body>
    </html>
  );
}
