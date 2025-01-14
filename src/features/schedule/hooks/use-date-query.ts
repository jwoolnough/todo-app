"use client";

import { format, isThisWeek } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";

import { startOfWeek } from "~/utils/date";

const useDateQuery = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedDate = searchParams.get("d")
    ? new Date(String(searchParams.get("d")))
    : new Date();
  const selectedWeekDate = startOfWeek(selectedDate);

  const setSelectedDate = async (date: Date = new Date()) => {
    const url = isThisWeek(date, { weekStartsOn: 1 })
      ? "/"
      : `/?d=${format(date, "yyyy-MM-dd")}`;

    router.push(url);
  };

  return {
    selectedDate,
    selectedWeekDate,
    setSelectedDate,
  };
};

export { useDateQuery };
