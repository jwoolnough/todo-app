import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import localFont from "next/font/local";

import { api } from "@/utils/api";

import "@/styles/globals.css";

const jones = localFont({
  src: [
    {
      path: "../styles/fonts/jones-light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../styles/fonts/jones-book.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../styles/fonts/jones-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../styles/fonts/jones-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-jones",
});

const TodoApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div className={`${jones.variable} font-primary`}>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(TodoApp);
