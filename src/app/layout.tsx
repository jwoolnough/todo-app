import { type Metadata } from "next";

import "~/styles/globals.css";

import { TRPCReactProvider } from "~/trpc/react";

import { APP_NAME } from "~/constants";

export const metadata: Metadata = {
  title: { default: APP_NAME, template: `%s | ${APP_NAME}` },
  icons: [{ rel: "apple-touch-icon-precomposed", url: "/favicon-180.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-navy-950 text-navy-300">
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
