import { type Metadata } from "next";

import "~/styles/globals.css";

import { TRPCReactProvider } from "~/trpc/react";

import { TooltipProvider } from "~/components";
import { APP_NAME } from "~/constants";

export const metadata: Metadata = {
  title: { default: APP_NAME, template: `%s - ${APP_NAME}` },
  icons: [{ rel: "apple-touch-icon-precomposed", url: "/favicon-180.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <head>
        // TODO: Have temporarily overridden Typekit with a local font-face declaration, due
        // to broken ascent rendering from their end. It's weird...
        <link rel="stylesheet" href="https://use.typekit.net/npu1ise.css" />
      </head> */}
      <body className="bg-navy-950 text-navy-300">
        <TooltipProvider delayDuration={300}>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
