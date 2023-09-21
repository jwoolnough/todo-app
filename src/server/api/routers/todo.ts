import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import { TODO_TYPE } from "@/constants/todo";

export const todoRouter = createTRPCRouter({
  getMyTodosByStatus: protectedProcedure
    .input(
      z.object({
        status: z.enum(TODO_TYPE),
        skip: z.number().optional(),
        take: z.number().optional(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.todo.findMany({
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

  createTodo: protectedProcedure
    .input(z.object({ title: z.string().max(255) }))
    .mutation(({ ctx, input }) => {
      return ctx.db.todo.create({
        data: {
          userId: ctx.session.user.id,
          ...input,
        },
      });
    }),

  updateTodo: protectedProcedure
    // .input()
    .mutation(({ ctx }) => {
      return ctx.db.todo.update({
        data: {},
        where: {
          id: "123",
        },
      });
    }),
});
