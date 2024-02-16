import { startOfWeek as dateFnsStartOfWeek } from "date-fns";

const startOfWeek = (date: Date) =>
  dateFnsStartOfWeek(date, { weekStartsOn: 1 });

export { startOfWeek };
