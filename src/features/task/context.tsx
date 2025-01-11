"use client";

import type { Task } from "@prisma/client";
import { createContext, useContext } from "react";

const TaskContext = createContext<Task | null>(null);

const useTaskContext = () => {
  const context = useContext(TaskContext);

  if (context === null) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }

  return context;
};

export { TaskContext, useTaskContext };
