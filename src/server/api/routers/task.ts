import { TaskStatus } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const taskRouter = createTRPCRouter({
  getMyTasksByStatus: protectedProcedure
    .input(
      z.object({
        status: z.nativeEnum(TaskStatus),
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
        orderBy: [
          {
            unscheduledOrder: "asc",
          },
          {
            createdAt: "asc",
          },
        ],
      });
    }),

  getTotalUnscheduledTasksCount: protectedProcedure.query(({ ctx }) => {
    return ctx.db.task.count({
      where: {
        userId: ctx.session.user.id,
        status: {
          not: TaskStatus.SCHEDULED,
        },
      },
    });
  }),

  createTask: protectedProcedure
    .input(
      z.object({
        title: z.string().max(255),
        status: z.nativeEnum(TaskStatus),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.task.create({
        data: {
          userId: ctx.session.user.id,
          ...input,
        },
      });
    }),

  upsertTask: protectedProcedure
    .input(
      z.object({
        title: z.string().max(255),
        id: z.string().optional(),
        notes: z.string().max(500).optional(),
        status: z.nativeEnum(TaskStatus),
        unscheduledOrder: z.number().optional(),
        scheduledDate: z.date().optional(),
        scheduledOrder: z.number().optional(),
        completed: z.boolean().optional(),
        completedAt: z.date().optional(),
      }),
    )
    .mutation(({ input, ctx }) => {
      return ctx.db.$transaction(async (tx) => {
        const existingTask = await tx.task.findFirst({
          where: {
            id: input.id,
          },
        });

        if (existingTask && existingTask.userId !== ctx.session.user.id) {
          // User does not own task
          throw new Error("unauthorized");
        }

        return ctx.db.task.upsert({
          update: {
            ...input,
          },
          create: {
            userId: ctx.session.user.id,
            ...input,
          },
          where: {
            id: input.id,
          },
        });
      });
    }),

  deleteTask: protectedProcedure
    .input(z.string())
    .mutation(({ input: id, ctx }) => {
      return ctx.db.$transaction(async (tx) => {
        // Assert user owns task
        await tx.task.findFirstOrThrow({
          where: {
            id,
            userId: ctx.session.user.id,
          },
        });

        return tx.task.delete({
          where: {
            id,
          },
        });
      });
    }),
});
