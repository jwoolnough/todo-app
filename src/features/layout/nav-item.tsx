import Link from "next/link";

import { Count } from "~/components/count";

import { useServerPathname } from "~/hooks";
import { cn } from "~/utils";

import { NavActiveIndicator } from "./nav-active-indicator";

type IconProps = { size: number };

type NavItemProps = React.PropsWithChildren<
  {
    as: "button" | "a";
    title: string;
    renderIcon: (iconProps: IconProps) => React.ReactNode;
    className?: string;
    wrapperClassName?: string;
    isActive?: boolean;
    count?: number;
  } & {
    as?: "a";
    href: string;
  }
>;

const NavItem = ({
  title,
  as = "button",
  className,
  wrapperClassName,
  renderIcon,
  isActive,
  count = 0,
  ...rest
}: NavItemProps) => {
  const Component = as === "button" ? "button" : Link;

  const iconProps = {
    size: 18,
  };

  return (
    <li className={cn("relative md:px-1", wrapperClassName)}>
      {isActive ? <NavActiveIndicator /> : null}

      <Component
        className={cn(
          "flex size-12 items-center justify-center rounded-lg hover:text-white",
          isActive && "drop-shadow-neon text-green-500",
          className,
        )}
        aria-label={title}
        {...rest}
      >
        <div className="relative">
          {renderIcon(iconProps)}
          <Count
            count={count}
            className="border-slate-950 sm:border-slate-900 absolute left-0 top-0 min-w-[1.25rem] -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
          />
        </div>
      </Component>
    </li>
  );
};

const NavItemLink = ({
  href,
  ...rest
}: Omit<NavItemProps, "as"> & { href: string }) => {
  // const pathname = usePathname();
  const pathname = useServerPathname();
  const isActive = pathname === href;

  return <NavItem as="a" href={href} isActive={isActive} {...rest} />;
};

export { NavItem, NavItemLink };
