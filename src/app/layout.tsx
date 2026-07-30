import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
