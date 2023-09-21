import { type NextPage } from "next";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppProps } from "next/app";

import { ToastProvider } from "@/components/toast";
import "@/components/toast/style.css";

import { Layout } from "@/features/layout";

import { api } from "@/utils/api";

import "@/styles/globals.css";

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
      <ToastProvider>{getLayout(<Component {...pageProps} />)}</ToastProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(TodoApp);
export { type NextPageWithLayout };
