import { DialogClose } from "@radix-ui/react-dialog";
import { FiPlus } from "react-icons/fi";

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  IconButton,
  Input,
} from "~/components";

const AddTask = () => {
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
      <DialogContent>
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

export { AddTask };
