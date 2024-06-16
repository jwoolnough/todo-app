import {
  endOfWeek as dateFnsEndOfWeek,
  startOfWeek as dateFnsStartOfWeek,
} from "date-fns";

const startOfWeek = (date: Date) =>
  dateFnsStartOfWeek(date, { weekStartsOn: 1 });

const endOfWeek = (date: Date) => dateFnsEndOfWeek(date, { weekStartsOn: 1 });

export { startOfWeek, endOfWeek };
