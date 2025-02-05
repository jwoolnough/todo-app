import { z } from "zod";

import { DAY_TIMES } from "~/constants";

import { addDays, endOfWeek, format, startOfWeek } from "~/utils/date";

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
        scheduledStartDate: z.date(),
        scheduledEndDate: z.date(),
        description: z.string().nullable(),
        note: z.string().nullable(),
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

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input: id }) => {
      return ctx.db.$transaction(async (tx) => {
        // Assert user owns task
        await tx.task.findFirstOrThrow({
          where: {
            id,
            createdById: ctx.session.user.id,
          },
        });

        return tx.task.delete({
          where: {
            id,
          },
        });
      });
    }),

  getByWeek: protectedProcedure
    .input(
      z
        .date()
        .optional()
        .default(() => new Date()),
    )

    .query(async ({ ctx, input: date }) => {
      const start = startOfWeek(date);
      const end = endOfWeek(date);

      return ctx.db.task.findMany({
        where: {
          createdBy: { id: ctx.session.user.id },
          scheduledStartDate: {
            gte: start,
            lte: end,
          },
        },
        orderBy: [
          {
            scheduledStartDate: "asc",
          },
          {
            scheduledEndDate: "asc",
          },
        ],
      });
    }),

  getAvailableTimesByDate: protectedProcedure
    .input(z.date())
    .query(async ({ ctx, input: date }) => {
      const dayTasks = await ctx.db.task.findMany({
        where: {
          createdBy: { id: ctx.session.user.id },
          scheduledStartDate: {
            gte: date,
            lt: addDays(date, 1),
          },
        },
        orderBy: {
          scheduledStartDate: "asc",
        },
      });

      // Remove last entry so we don't include midnight
      return DAY_TIMES.slice(0, -1).map((time, i) => {
        const startDateTime = new Date(`${format(date, "yyyy-MM-dd")}T${time}`);

        // Find the first task that blocks out this start
        const blockerTask = dayTasks.find(
          ({ scheduledStartDate, scheduledEndDate }) => {
            if (!scheduledStartDate || !scheduledEndDate) return false;

            return (
              // Cannot start at the same time as another task, but can start as another ends
              startDateTime >= scheduledStartDate &&
              startDateTime < scheduledEndDate
            );
          },
        );

        // Find the next task after the current time, so we can use its start time as the last possible end time
        const nextTaskStartTime = dayTasks.find(
          ({ scheduledStartDate }) =>
            scheduledStartDate && scheduledStartDate > startDateTime,
        )?.scheduledStartDate;

        return {
          startTime: time,
          isAvailable: blockerTask === undefined,
          blockedBy: blockerTask?.title,
          endTimes: DAY_TIMES.slice(
            i + 1,
            nextTaskStartTime
              ? DAY_TIMES.indexOf(format(nextTaskStartTime, "HH:mm")) + 1
              : undefined,
          ),
        };
      });

      // return {
      //   startTimes: DAY_TIMES.filter((time) => {
      //     return (
      //       dayTasks.find(({ scheduledStartDate, scheduledEndDate }) => {
      //         if (!scheduledStartDate || !scheduledEndDate) return false;

      //         return isWithinInterval(`${format(date, "yyyy-MM-dd")}T${time}`, {
      //           start: scheduledStartDate,
      //           end: subSeconds(scheduledEndDate, 1),
      //         });
      //       }) === undefined
      //     );
      //   }),
      //   endTimes: DAY_TIMES.filter((time) => {
      //     return (
      //       dayTasks.find(({ scheduledStartDate, scheduledEndDate }) => {
      //         if (!scheduledStartDate || !scheduledEndDate) return false;

      //         return isWithinInterval(`${format(date, "yyyy-MM-dd")}T${time}`, {
      //           start: addSeconds(scheduledStartDate, 1),
      //           end: scheduledEndDate,
      //         });
      //       }) === undefined
      //     );
      //   }),
      //   tasks: dayTasks,
      // };
    }),
});
