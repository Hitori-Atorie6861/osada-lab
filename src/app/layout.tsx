import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "XX Lab — Research Laboratory",
  description: "Research lab website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
