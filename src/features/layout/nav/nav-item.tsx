import { Slot } from "@radix-ui/react-slot";

import { Tooltip, TooltipContent, TooltipTrigger } from "~/components";
import { cn } from "~/utils";

import { NavActiveIndicator } from "./nav-active-indicator";

type NavItemProps = React.HTMLAttributes<HTMLButtonElement> & {
  title: string;
  className?: string;
  wrapperClassName?: string;
  isActive?: boolean;
  asChild?: boolean;
};

const NavItem = ({
  title,
  className,
  wrapperClassName,
  isActive,
  asChild,
  children,
  ...rest
}: NavItemProps) => {
  const Component = asChild ? Slot : "button";

  return (
    <li className={cn("relative md:px-1", wrapperClassName)}>
      {isActive ? <NavActiveIndicator /> : null}

      <Tooltip>
        <TooltipTrigger asChild>
          <Component
            className={cn(
              "flex size-12 items-center justify-center rounded-lg hover:text-white",
              isActive && "text-green-500 hover:text-green-500",
              className,
            )}
            aria-label={title}
            {...rest}
          >
            {children}
          </Component>
        </TooltipTrigger>
        <TooltipContent side="right" className="max-md:hidden">
          {title}
        </TooltipContent>
      </Tooltip>
    </li>
  );
};

type IconProps = { size: number };
type NavItemIconProps = {
  renderIcon: (iconProps: IconProps) => React.ReactNode;
};

const NavItemIcon = ({ renderIcon }: NavItemIconProps) => {
  return renderIcon({ size: 18 });
};

export { NavItem, NavItemIcon, type NavItemProps };
