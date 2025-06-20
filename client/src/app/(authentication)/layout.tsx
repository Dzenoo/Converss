import { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import { QueryContextProvider } from "@/context/react-query-client";
import { Toaster } from "@/components/ui/info/sonner";

import "../globals.css";
import AuthLayoutWrapper from "./_AuthLayoutWrapper";

export const metadata: Metadata = {
  icons: "favicon.ico",
  title: {
    default: "Converss | Authentication",
    template: "%s | Converss",
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <QueryContextProvider>
          <AuthLayoutWrapper>{children}</AuthLayoutWrapper>
        </QueryContextProvider>
        <Toaster />
      </body>
    </html>
  );
}
