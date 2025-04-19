"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const classNames = {
  toast:
    "rounded-lg bg-navy-500/50 p-4 backdrop-blur-md shadow-lg [width:var(--width)]",
  title: "font-semibold text-white",
  icon: "hidden",
  closeButton: "bg-navy-500/75 border-none shadow-lg hover:text-navy-950",
};

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      position="bottom-center"
      className="toaster group font-sans text-navy-100"
      toastOptions={{
        unstyled: true,
        classNames,
        closeButton: true,
      }}
      // Annoyingly can't just do `icons={null}`
      icons={{
        info: <></>,
        warning: <></>,
        error: <></>,
        success: <></>,
      }}
      {...props}
    />
  );
};

export { Toaster };
