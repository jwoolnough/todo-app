import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import { endOfWeek, startOfWeek } from "~/utils";

export const taskRouter = createTRPCRouter({
  createInList: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        taskListId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.task.create({
        data: {
          title: input.title,
          taskList: { connect: { id: input.taskListId } },
          createdBy: { connect: { id: ctx.session.user.id } },
          order: await ctx.db.task
            .aggregate({
              where: {
                createdById: ctx.session.user.id,
                taskListId: input.taskListId,
              },
              _max: {
                order: true,
              },
            })
            .then((res) => (res._max.order ?? 0) + 1),
        },
      });
    }),

  createInSchedule: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        scheduledDateStart: z.date(),
        scheduledEndDate: z.date().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // TODO: Check for schedule clashes here
      return ctx.db.task.create({
        data: {
          ...input,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getByWeek: protectedProcedure
    .input(
      z.object({
        date: z
          .date()
          .optional()
          .default(() => new Date()),
      }),
    )
    .query(async ({ ctx, input }) => {
      const start = startOfWeek(input.date);
      const end = endOfWeek(input.date);

      return ctx.db.task.findMany({
        where: {
          createdBy: { id: ctx.session.user.id },
          scheduledStartDate: {
            gte: start,
            lte: end,
          },
        },
        orderBy: {
          scheduledStartDate: "asc",
          scheduledEndDate: "asc",
        },
      });
    }),

  // upsert: protectedProcedure.input(z.object({
  //   title: z.string().max(255),
  // }))
});
