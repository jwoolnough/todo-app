import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "~/components";

import { useTaskContext } from "../context";
import { DeleteMenuItem } from "./delete-menu-item";

const TaskContextMenu = ({ children }: React.PropsWithChildren) => {
  const task = useTaskContext();

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Edit...</ContextMenuItem>
        <DeleteMenuItem />
        {task.scheduledStartDate && (
          <>
            <ContextMenuSeparator />
            <ContextMenuItem>Lock</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuSub>
              <ContextMenuSubTrigger>Move</ContextMenuSubTrigger>
              <ContextMenuSubContent>
                <ContextMenuItem>To previous week</ContextMenuItem>
                <ContextMenuItem>To next week</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuSub>
              <ContextMenuSubTrigger>Duplicate</ContextMenuSubTrigger>
              <ContextMenuSubContent>
                <ContextMenuItem>In previous week</ContextMenuItem>
                <ContextMenuItem>In next week</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
          </>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
};

export { TaskContextMenu };
