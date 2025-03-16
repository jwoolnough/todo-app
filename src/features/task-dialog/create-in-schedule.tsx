"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiMinus, FiPlus, FiX } from "react-icons/fi";
import { toast } from "sonner";
import type { z } from "zod";

import { cn } from "~/utils";
import { addDays, format, set } from "~/utils/date";

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  IconButton,
} from "~/components";
import { Form } from "~/components/form";

import { api } from "~/trpc/react";

import { FormFields } from "./form-fields";
import { CreateInScheduleSchema } from "./schema";

type OptionsToggleButtonProps = {
  className?: string;
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

const OptionsToggleButton = ({
  className,
  isExpanded,
  setIsExpanded,
}: OptionsToggleButtonProps) => (
  <Button
    variant="link"
    className={cn("mr-auto gap-2 p-0", className)}
    onClick={() => setIsExpanded((prev) => !prev)}
  >
    {!isExpanded ? (
      <>
        <FiPlus /> More options
      </>
    ) : (
      <>
        <FiMinus /> Fewer options
      </>
    )}
  </Button>
);

type CreateInScheduleDialogProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTime: Date | null;
};

const CreateInScheduleDialog = ({
  isOpen,
  setIsOpen,
  selectedTime,
}: CreateInScheduleDialogProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const utils = api.useUtils();
  const createInSchedule = api.task.createInSchedule.useMutation({
    onSuccess: async () => {
      await utils.task.getByWeek.invalidate();
    },
  });

  const form = useForm<z.infer<typeof CreateInScheduleSchema>>({
    resolver: zodResolver(CreateInScheduleSchema),
    defaultValues: {
      title: "",
      scheduledDate: new Date(),
      description: "",
      note: "",
      // startTime:
    },
  });

  useEffect(() => {
    if (selectedTime) {
      form.setValue("scheduledDate", selectedTime);
      form.setValue("startTime", format(selectedTime, "HH:mm"));
    }
  }, [form, selectedTime]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <IconButton
          label="Add task"
          size="lg"
          className="fixed bottom-8 right-8 z-20 shadow-neon max-md:hidden"
        >
          <FiPlus size={28} />
        </IconButton>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async (data) => {
              const {
                title,
                scheduledDate,
                startTime,
                endTime,
                description,
                note,
              } = data;

              const [startHour, startMinute] = startTime.split(":").map(Number);
              const [endHour, endMinute] = endTime.split(":").map(Number);

              try {
                await createInSchedule.mutateAsync({
                  title,
                  description: description ? description : null,
                  note: note ? note : null,
                  scheduledStartDate: set(scheduledDate, {
                    hours: startHour,
                    minutes: startMinute,
                  }),
                  scheduledEndDate:
                    endTime === "24:00"
                      ? addDays(scheduledDate, 1)
                      : set(scheduledDate, {
                          hours: endHour,
                          minutes: endMinute,
                        }),
                });
              } catch {
                toast.error("Unable to add task, please try again");
              }

              toast.success("Task added successfully");
              form.reset();
              setIsOpen(false);
            })}
          >
            <DialogHeader className="flex items-center gap-2">
              <DialogTitle>Add task</DialogTitle>
              <DialogClose asChild>
                <IconButton
                  label="Close"
                  variant="link"
                  size="sm"
                  withTooltip={false}
                  className="ml-auto"
                >
                  <FiX />
                </IconButton>
              </DialogClose>
            </DialogHeader>

            <FormFields isExpanded={isExpanded} />

            <OptionsToggleButton
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
              className="mt-6 sm:hidden"
            />

            <DialogFooter>
              <OptionsToggleButton
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
                className="max-sm:hidden"
              />
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
              <Button type="submit" isLoading={form.formState.isSubmitting}>
                Add task
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export { CreateInScheduleDialog };
