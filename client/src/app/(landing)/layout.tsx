import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import "../globals.css";
import LandingLayoutWrapper from "./_LandingLayoutWrapper";

export const metadata: Metadata = {
  title: {
    default: "Converss | Build Your Own AI Chatbot in Minutes",
    template: "%s | Converss",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <LandingLayoutWrapper>{children}</LandingLayoutWrapper>
      </body>
    </html>
  );
}
