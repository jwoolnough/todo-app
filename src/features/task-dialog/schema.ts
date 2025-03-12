import { z } from "zod";

const CreateInScheduleSchema = z.object({
  title: z.string().min(1, { message: "Title is a required field" }),
  scheduledDate: z.date(),
  startTime: z.string(),
  endTime: z.string(),
  description: z.string().max(300).optional(),
  note: z.string().max(300).optional(),
});

export { CreateInScheduleSchema };
