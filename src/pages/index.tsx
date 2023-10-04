import { format, startOfWeek } from "date-fns";
import Head from "next/head";
import { useRouter } from "next/router";
import { FiCalendar, FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { Button, IconButton } from "@/components/button";

import { Schedule } from "@/features/schedule";

import { getServerSidePropsWithAuth } from "@/utils/auth";

export default function Dashboard() {
  const router = useRouter();

  const date =
    typeof router.query?.d === "string" ? new Date(router.query.d) : new Date();
  const startOfWeekDate = startOfWeek(date, { weekStartsOn: 1 });

  console.log(router.query);

  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="" />
      </Head>

      <header className="flex items-center justify-between p-6">
        <div className="flex items-baseline gap-4">
          <h1 className="text-lg font-bold leading-tight text-white md:text-2xl">
            {format(startOfWeekDate, "MMMM Y")}
          </h1>
          <h2 className="text-lg leading-tight">
            Week {format(startOfWeekDate, "w")}
          </h2>
        </div>

        <ul className="flex items-center">
          <li className="leading-none">
            <IconButton variant="link" type="button" label="Previous week">
              <FiChevronLeft size={22} />
            </IconButton>
          </li>
          <li className="leading-none">
            <IconButton variant="link" type="button" label="Choose date">
              <FiCalendar size={22} />
            </IconButton>
          </li>
          <li className="leading-none">
            <IconButton variant="link" type="button" label="Next week">
              <FiChevronRight size={22} />
            </IconButton>
          </li>
          <li className="ml-2 max-sm:hidden">
            <Button size="sm">Go to today</Button>
          </li>
        </ul>
      </header>

      <Schedule />
    </>
  );
}

export const getServerSideProps = getServerSidePropsWithAuth;
