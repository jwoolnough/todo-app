import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useBreakpoint } from "@/hooks/use-breakpoint";

import { Count } from "@/components/count";
import { Tippy } from "@/components/tippy";

import { usePanelStore } from "@/features/task/panel/use-panel-store";

import { clsxm } from "@/utils/clsxm";
import type { ComponentWithAs } from "@/utils/component-with-as";

type NavItemProps = {
  title: string;
  renderIcon: (iconProps: { size: number }) => React.ReactNode;
  wrapperClassName?: string;
  isActive?: boolean;
  count?: number;
};

const NavItem: ComponentWithAs<"button", NavItemProps> = ({
  as,
  title,
  wrapperClassName,
  renderIcon,
  className,
  isActive,
  count = 0,
  ...rest
}) => {
  const Component = as ?? "button";

  const iconProps = {
    size: 22,
  };

  return (
    <li
      className={clsxm("relative flex w-full justify-center", wrapperClassName)}
    >
      {isActive ? (
        <motion.span
          layoutId="indicator"
          role="presentation"
          className="absolute bg-green-500 max-sm:bottom-0 max-sm:h-1 max-sm:w-[3.75rem] max-sm:rounded-t-full sm:left-0 sm:h-full sm:w-1 sm:rounded-e-[0.25rem]"
        ></motion.span>
      ) : null}

      <Tippy content={title} placement="right" className="max-sm:hidden">
        <Component
          className={clsxm(
            "flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-md hover:text-white",
            "sm:h-9 sm:w-9",
            isActive && "text-green-500",
            className,
          )}
          aria-label={title}
          {...rest}
        >
          <div className="relative">
            {renderIcon(iconProps)}
            <Count
              count={count}
              className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </Component>
      </Tippy>
    </li>
  );
};

const NavItemLink = ({ href, ...rest }: NavItemProps & { href: string }) => {
  const panelIsOpen = usePanelStore((state) => state.panelIsOpen);
  const isSmall = useBreakpoint("sm");
  const pathname = usePathname();
  const isActive = isSmall
    ? href === pathname
    : href === pathname && !panelIsOpen;

  return <NavItem as={Link} href={href} isActive={isActive} {...rest} />;
};

export { NavItem, NavItemLink };
