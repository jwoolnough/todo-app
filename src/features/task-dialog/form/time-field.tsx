import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { FiArrowRight } from "react-icons/fi";
import type { z } from "zod";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components";

import { api } from "~/trpc/react";

import type { CreateInScheduleSchema } from "../schema";

const TimeField = () => {
  const form = useFormContext<z.infer<typeof CreateInScheduleSchema>>();
  const watchedScheduledDate = form.watch("scheduledDate");
  const watchedStartTime = form.watch("startTime");
  const { data: times } = api.task.getAvailableTimesByDate.useQuery(
    watchedScheduledDate,
    {
      enabled: watchedScheduledDate !== undefined,
    },
  );

  const endTimes =
    times?.find((time) => time.startTime === watchedStartTime)?.endTimes ?? [];

  // When user changes startTime, automatically set the endTime to the next slot
  useEffect(() => {
    if (!watchedStartTime) {
      return;
    }

    const firstEndTime = endTimes?.[0];

    if (firstEndTime) {
      form.setValue("endTime", firstEndTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedStartTime]);

  return (
    <FormField
      control={form.control}
      name="startTime"
      render={({ field }) => (
        <FormItem className="col-span-full grid grid-cols-subgrid items-center">
          <FormLabel>Time</FormLabel>
          <div>
            <div className="flex items-center gap-1">
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                  value={field.value}
                >
                  <SelectTrigger ref={field.ref}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {times?.map(({ startTime, isAvailable, blockedBy }, i) => {
                      const prevBlockedBy = times[i - 1]?.blockedBy;

                      return (
                        <SelectItem
                          key={startTime}
                          value={startTime}
                          disabled={!isAvailable}
                        >
                          {startTime}
                          {blockedBy &&
                            prevBlockedBy !== blockedBy &&
                            `- ${blockedBy}`}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </FormControl>
              <FiArrowRight className="shrink-0" />
              <Select
                disabled={!field.value}
                onValueChange={(value) => form.setValue("endTime", value)}
                value={form.watch("endTime")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {endTimes.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export { TimeField };
