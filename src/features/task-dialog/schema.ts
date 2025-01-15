import { z } from "zod";

const CreateInScheduleSchema = z.object({
  title: z.string().min(1),
  scheduledDate: z.date(),
  startTime: z.string(),
  endTime: z.string(),
  description: z.string().optional(),
  note: z.string().optional(),
});

export { CreateInScheduleSchema };
