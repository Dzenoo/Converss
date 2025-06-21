import { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { ClerkProvider } from "@clerk/nextjs";

import "../globals.css";
import OnboardingWrapper from "./_OnboardingWrapper";

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
          <OnboardingWrapper>{children}</OnboardingWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
