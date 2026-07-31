import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { QueryProviders } from "@/providers/QueryProviders";

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
    <html lang="id">
      <body className="bg-app-background text-text-primary antialiased">
        <QueryProviders>{children}</QueryProviders>
      </body>
    </html>
  );
}
