import { Slot, Slottable } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";
import { BiLoaderAlt } from "react-icons/bi";

import { cn } from "~/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full font-semibold disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-green-500 text-navy-950 hover:bg-white hover:[--neon-color:#fff]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-input bg-background hover:bg-accent hover:text-accent-foreground border",
        secondary: "bg-navy-500 text-white hover:bg-white hover:text-navy-950",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "rounded-lg text-navy-300 hover:text-white",
        input:
          "rounded-lg border bg-navy-950 px-3 py-2 text-left !font-regular text-white focus:ring-1 focus:ring-green-300 data-[placeholder]:text-navy-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-7 px-3",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
  };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      type,
      size,
      asChild = false,
      children,
      isLoading,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Component = asChild ? Slot : "button";

    return (
      <Component
        className={cn(
          buttonVariants({ variant, size }),
          variant === "link" && "h-auto p-0",
          isLoading && "text-transparent",
          disabled && "opacity-50",
          className,
        )}
        ref={ref}
        type={!asChild && type === undefined ? "button" : type}
        disabled={isLoading ?? disabled}
        {...props}
      >
        <Slottable>{children}</Slottable>
        <BiLoaderAlt
          className={cn(
            variant === "default" && "text-navy-950",
            variant === "secondary" && "text-white",
            variant === "link" && "text-navy-300",
            "pointer-events-none absolute size-5 animate-spin place-items-center bg-transparent opacity-0 transition",
            isLoading && "opacity-100",
          )}
        />
      </Component>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants, type ButtonProps };
