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

const TaskContextMenu = ({ children }: React.PropsWithChildren) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Edit...</ContextMenuItem>
        <ContextMenuItem>Delete</ContextMenuItem>
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
            <ContextMenuItem>To previous week</ContextMenuItem>
            <ContextMenuItem>To next week</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export { TaskContextMenu };
