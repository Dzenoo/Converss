import { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { ClerkProvider } from "@clerk/nextjs";

import { QueryContextProvider } from "@/context/react-query-client";
import OnboardingWrapper from "./_OnboardingWrapper";

import "../globals.css";

export const metadata: Metadata = {
  icons: "favicon.ico",
  title: {
    default: "Converss | Onboarding",
    template: "%s | Converss",
  },
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={GeistSans.className}>
          <QueryContextProvider>
            <OnboardingWrapper>{children}</OnboardingWrapper>
          </QueryContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
