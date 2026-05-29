import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navigation } from "@/components/navigation";

export const metadata: Metadata = {
  title: "Lakbay LocalPass | Tayabas Tourism Super App",
  description: "A demo tourism discovery, LocalPass QR rewards, and dashboard platform for Tayabas City.",
  manifest: "/manifest.json"
};

export const viewport: Viewport = {
  themeColor: "#2B6D4F",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
