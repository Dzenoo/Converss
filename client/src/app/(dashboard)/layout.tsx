import { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { ClerkProvider } from "@clerk/nextjs";

import "../globals.css";
import DashboardWrapper from "./_DashboardWrapper";

export const metadata: Metadata = {
  icons: "favicon.ico",
  title: {
    default: "Converss | Dashboard",
    template: "%s | Converss",
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={GeistSans.className}>
          <DashboardWrapper>{children}</DashboardWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
