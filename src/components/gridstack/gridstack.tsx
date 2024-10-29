"use client";

import { Slot } from "@radix-ui/react-slot";
import {
  GridStack,
  type GridStackNode,
  type GridStackOptions,
} from "gridstack";
import "gridstack/dist/gridstack-extra.css";
import { createContext, useContext, useEffect, useRef } from "react";

import "./gridstack-custom.css";

const GridStackContext = createContext<GridStack | null>(null);

const useGridStack = () => {
  const gridStack = useContext(GridStackContext);

  return gridStack;
};

type GridStackNodeWithID = GridStackNode & { id: string };

type GridStackProps<T extends GridStackNodeWithID> = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange"
> & {
  options: GridStackOptions;
  children: React.ReactNode;
  cells?: T[];
  setCells?: React.Dispatch<React.SetStateAction<T[]>>;
  onChange?: (event: Event, nodes: GridStackNode[]) => void;
  asChild?: boolean;
};

const GridStackComponent = <T extends GridStackNodeWithID>({
  options,
  children,
  cells,
  setCells,
  onChange,
  asChild = false,
  ...rest
}: GridStackProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridStackRef = useRef<GridStack | null>(null);
  const Component = asChild ? Slot : "div";

  // Initial setup
  useEffect(() => {
    if (containerRef.current === null) {
      return;
    }

    gridStackRef.current = GridStack.init(options, containerRef.current);

    // setGrid(GridStack.init(options, containerRef.current));
  }, [options]);

  useEffect(() => {
    if (gridStackRef.current === null) {
      return;
    }

    const gridStack = gridStackRef.current;

    gridStack.on("change", (e, nodes) => {
      // get back full list of nodes?
      // console.log(gridStack.save(true, true).children);
      onChange?.(e, nodes);
    });

    return () => {
      gridStackRef.current?.off("change");
    };
  }, [onChange]);

  return (
    <GridStackContext.Provider value={null}>
      <Component ref={containerRef} {...rest}>
        {children}
      </Component>
    </GridStackContext.Provider>
  );
};

export { useGridStack, GridStackComponent as GridStack };
