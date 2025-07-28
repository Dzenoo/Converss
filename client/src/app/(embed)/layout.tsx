import { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { QueryContextProvider } from "@/context/react-query-client";
import EmbedWrapper from "./_EmbedWrapper";

import "../globals.css";

export const metadata: Metadata = {
  icons: "favicon.ico",
  title: "Converss",
};

const EmbedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <QueryContextProvider>
          <EmbedWrapper>{children}</EmbedWrapper>
        </QueryContextProvider>
      </body>
    </html>
  );
};

export default EmbedLayout;
