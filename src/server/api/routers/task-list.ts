import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const taskListRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.taskList.findMany({
      include: { tasks: { orderBy: { order: "asc" } } },
      where: { createdById: ctx.session.user.id },
      orderBy: { order: "asc" },
    });
  }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.taskList.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
          order: await ctx.db.taskList
            .aggregate({
              where: {
                createdById: ctx.session.user.id,
              },
              _max: {
                order: true,
              },
            })
            .then((res) => (res._max.order ?? 0) + 1),
        },
      });
    }),
});

export { taskListRouter };
