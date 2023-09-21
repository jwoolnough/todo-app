import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import { TASK_TYPE } from "@/constants/task";

export const taskRouter = createTRPCRouter({
  getMyTasksByStatus: protectedProcedure
    .input(
      z.object({
        status: z.enum(TASK_TYPE),
        skip: z.number().optional(),
        take: z.number().optional(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.task.findMany({
        where: {
          userId: ctx.session.user.id,
          status: input.status,
        },
        skip: input.skip,
        take: input.take,
        orderBy: {
          unscheduledOrder: "asc",
        },
      });
    }),

  createTask: protectedProcedure
    .input(z.object({ title: z.string().max(255) }))
    .mutation(({ ctx, input }) => {
      return ctx.db.task.create({
        data: {
          userId: ctx.session.user.id,
          ...input,
        },
      });
    }),

  updateTask: protectedProcedure
    // .input()
    .mutation(({ ctx }) => {
      return ctx.db.task.update({
        data: {},
        where: {
          id: "123",
        },
      });
    }),
});
