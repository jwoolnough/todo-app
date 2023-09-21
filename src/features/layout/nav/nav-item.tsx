import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Count } from "@/components/count";
import { Tippy } from "@/components/tippy";

import { clsxm } from "@/utils/clsxm";

import type { PolymorphicComponentProps } from "@/types/polymorphic-component";

type NavItemProps = {
  title: string;
  renderIcon: (iconProps: { size: number }) => React.ReactNode;
  wrapperClassName?: string;
  isActive?: boolean;
  count?: number;
};

const NavItem = <C extends React.ElementType = "button">({
  as,
  title,
  wrapperClassName,
  renderIcon,
  className,
  isActive,
  count = 0,
  ...rest
}: PolymorphicComponentProps<C, NavItemProps>) => {
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
            <AnimatePresence>
              {count > 0 && (
                <Count
                  as={motion.span}
                  count={count}
                  className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </AnimatePresence>
          </div>
        </Component>
      </Tippy>
    </li>
  );
};

const NavItemLink = ({ href, ...rest }: NavItemProps & { href: string }) => {
  const isActive = href === usePathname();

  return <NavItem as={Link} href={href} isActive={isActive} {...rest} />;
};

export { NavItem, NavItemLink };
