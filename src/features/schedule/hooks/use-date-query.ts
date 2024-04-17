"use client";

import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";

import { startOfWeek } from "~/utils";

const useDateQuery = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedDate = searchParams.get("d")
    ? new Date(String(searchParams.get("d")))
    : new Date();
  const selectedWeek = startOfWeek(selectedDate);

  const setSelectedDate = async (date?: Date) => {
    router.push(`/?d=${format(date ?? new Date(), "yyyy-MM-dd")}`);
  };

  return {
    selectedDate,
    selectedWeek,
    setSelectedDate,
  };
};

export { useDateQuery };
