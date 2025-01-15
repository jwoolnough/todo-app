"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiMinus, FiPlus, FiX } from "react-icons/fi";
import type { z } from "zod";

import { Form } from "~/components/form";

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
import { cn } from "~/utils";

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

const CreateInScheduleDialog = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const form = useForm<z.infer<typeof CreateInScheduleSchema>>({
    resolver: zodResolver(CreateInScheduleSchema),
  });

  return (
    <Dialog>
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
          <form onSubmit={form.handleSubmit((data) => console.log(data))}>
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
              <Button type="submit">Add task</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export { CreateInScheduleDialog };
