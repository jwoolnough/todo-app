import Head from "next/head";

import { getServerSidePropsWithAuth } from "@/utils/auth";

export default function Tasks() {
  return (
    <>
      <Head>
        <title>Tasks | Todo App</title>
      </Head>
      <header className="flex items-center justify-between p-6">
        <div className="flex items-baseline gap-4">
          <h1 className="text-lg font-bold leading-tight text-white md:text-2xl">
            Tasks
          </h1>
        </div>
      </header>
    </>
  );
}

export const getServerSideProps = getServerSidePropsWithAuth;
