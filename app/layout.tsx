import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Niki Tsolaki - Frontend Developer",
  description: "Portfolio of Niki Tsolaki, frontend developer and founder of Metriqs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
