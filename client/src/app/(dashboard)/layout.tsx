import { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryContextProvider } from "@/context/react-query-client";
import DashboardWrapper from "./_DashboardWrapper";

import "../globals.css";

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
          <QueryContextProvider>
            <DashboardWrapper>{children}</DashboardWrapper>
          </QueryContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
