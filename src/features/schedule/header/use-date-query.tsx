import { format } from "date-fns";
import { useRouter } from "next/router";

const useDateQuery = () => {
  const router = useRouter();

  const selectedDate =
    typeof router.query?.d === "string" ? new Date(router.query.d) : new Date();

  const setSelectedDate = async (date?: Date) => {
    await router.push({
      query: {
        d: format(date ? date : new Date(), "yyyy-MM-dd"),
      },
    });
  };

  return {
    selectedDate,
    setSelectedDate,
  };
};

export { useDateQuery };
