import Head from "next/head";
import { useRouter } from "next/router";

import { Schedule } from "@/features/schedule";
import { ScheduleHeader } from "@/features/schedule/header";

import { getServerSidePropsWithAuth } from "@/utils/auth";
import { startOfWeek } from "@/utils/date";

export default function Dashboard() {
  const router = useRouter();

  const date =
    typeof router.query?.d === "string" ? new Date(router.query.d) : new Date();
  const startOfWeekDate = startOfWeek(date);

  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="" />
      </Head>

      <ScheduleHeader startOfWeekDate={startOfWeekDate} />
      <Schedule startOfWeekDate={startOfWeekDate} />
    </>
  );
}

export const getServerSideProps = getServerSidePropsWithAuth;
