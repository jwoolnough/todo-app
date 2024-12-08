"use client";

import { FiPlus } from "react-icons/fi";

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
  Input,
} from "~/components";

const AddTaskDialog = () => {
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
        <DialogHeader>
          <DialogTitle>Add task</DialogTitle>
        </DialogHeader>

        <Input />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button type="submit">Add task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { AddTaskDialog };
