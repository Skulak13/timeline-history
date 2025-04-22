import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The way to code!@Tomek Skulski",
  description: "My way to code!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={"antialiased"}>{children}</body>
    </html>
  );
}
