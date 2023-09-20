import { type NextPage } from "next";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppProps } from "next/app";
import localFont from "next/font/local";

import { Layout } from "@/features/layout";

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

type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps<{ session: Session | null }> & {
  Component: NextPageWithLayout;
};

const TodoApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <SessionProvider session={session}>
      <div className={`${jones.variable} font-primary`}>
        {getLayout(<Component {...pageProps} />)}
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(TodoApp);
export { type NextPageWithLayout };
