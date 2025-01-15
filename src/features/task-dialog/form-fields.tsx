"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { FiArrowRight } from "react-icons/fi";
import type { z } from "zod";

import { format } from "~/utils/date";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/form";

import { Button, DatePicker, Input, Textarea } from "~/components";

import type { CreateInScheduleSchema } from "./schema";

type FormFieldsProps = {
  isExpanded: boolean;
};

const FormFields = ({ isExpanded }: FormFieldsProps) => {
  const form = useFormContext<z.infer<typeof CreateInScheduleSchema>>();

  return (
    <>
      <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="col-span-full grid grid-cols-subgrid items-center">
              <FormLabel>Title</FormLabel>
              <div>
                <FormControl>
                  <Input autoFocus {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="scheduledDate"
          render={({ field }) => (
            <FormItem className="col-span-full grid grid-cols-subgrid items-center">
              <FormLabel>Date</FormLabel>
              <div>
                <DatePicker value={field.value} onChange={field.onChange}>
                  <FormControl>
                    <Button
                      ref={field.ref}
                      variant="input"
                      className="block w-full"
                      data-placeholder={!field.value ? true : undefined}
                    >
                      {field.value
                        ? format(field.value, "PPPP")
                        : "Pick a date"}
                    </Button>
                  </FormControl>
                </DatePicker>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem className="col-span-full grid grid-cols-subgrid items-center">
              <FormLabel>Time</FormLabel>
              <div>
                <div className="flex items-center gap-1">
                  <FormControl>
                    <Input className="w-24" {...field} />
                  </FormControl>
                  <FiArrowRight />
                  <Input className="w-24" disabled />
                </div>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>
      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.div
            animate={{ opacity: 1, height: "auto" }}
            initial={{ opacity: 0, height: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="col-span-full overflow-y-clip before:block before:h-6"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="border-t pt-6">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem className="mt-4 pb-[1px]">
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export { FormFields };
