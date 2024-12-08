import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

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

  // upsert: protectedProcedure.input(z.object({
  //   title: z.string().max(255),
  // }))
});
