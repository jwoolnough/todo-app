"use client";

import { Slot } from "@radix-ui/react-slot";
import type { GridStackPosition } from "gridstack";
import { useRef } from "react";

import { cn } from "~/utils";

import { useGridStack } from "./gridstack";

interface GridStackItemProps extends React.HTMLAttributes<HTMLDivElement> {
  position: GridStackPosition;
  children: React.ReactNode;
  asChild?: boolean;
}

const GridStackItem = ({
  id,
  position,
  children,
  asChild,
  className,
  ...rest
}: GridStackItemProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const grid = useGridStack();

  const Component = asChild ? Slot : "div";

  // Transform position object into `gs-` style props
  const positionProps = Object.keys({ ...position, id }).reduce(
    (acc, key) => ({
      ...acc,
      [`gs-${key}`]: position[key as keyof typeof position],
    }),
    {} as Record<
      `gs-${keyof GridStackPosition}`,
      GridStackPosition[keyof GridStackPosition]
    >,
  );

  // const optionsRef = useRef<GridStackNode>(options);
  // const [gridIsInitialized, setGridIsInitialized] = useState<boolean>(false);
  // const itemRef = useRef<GridStackElement | null>(null);

  // useEffect(() => {
  //   optionsRef.current = options;
  // }, [options]);

  // const updateStateIfItemPositionAndSizeHaveChanged = useCallback(
  //   (node: GridStackNode) => {
  //     setOptions?.((prev) => ({ ...prev, ...node }));
  //   },
  //   [setOptions],
  // );

  // const setupOnChangeEvent = useCallback(() => {
  //   if (!grid) {
  //     return;
  //   }

  //   grid.on("change", (_event, nodes) => {
  //     if (!nodes) {
  //       return;
  //     }

  //     for (const node of nodes) {
  //       if (node.el === itemRef.current) {
  //         updateStateIfItemPositionAndSizeHaveChanged(node);
  //       }
  //     }
  //   });
  // }, [grid, updateStateIfItemPositionAndSizeHaveChanged]);

  // useEffect(() => {
  //   if (
  //     !grid ||
  //     !gridIsInitialized ||
  //     containerRef.current === null ||
  //     optionsRef.current === null
  //   ) {
  //     return;
  //   }

  //   grid.batchUpdate(true);
  //   grid.update(containerRef.current, options);
  //   grid.batchUpdate(false);
  // }, [grid, options, gridIsInitialized]);

  // useEffect(() => {
  //   if (!grid || !containerRef.current || gridIsInitialized === true) {
  //     return;
  //   }

  //   grid.batchUpdate(true);
  //   itemRef.current = grid.addWidget(containerRef.current, optionsRef.current);
  //   grid.batchUpdate(false);
  //   setGridIsInitialized(true);
  //   setupOnChangeEvent();

  //   return () => {
  //     if (itemRef.current && gridIsInitialized && containerRef) {
  //       grid.removeWidget(itemRef.current, false);
  //       grid.off("change");
  //     }
  //   };
  // }, [grid, gridIsInitialized, setupOnChangeEvent]);

  return (
    <Component
      ref={containerRef}
      className={cn("grid-stack-item", className)}
      {...positionProps}
      {...rest}
    >
      {children}
    </Component>
  );
};

export { GridStackItem };
