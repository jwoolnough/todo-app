import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Count } from "@/components/count";

import { clsxm } from "@/utils/clsxm";

type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = unknown,
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

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
}: PolymorphicComponentProp<C, NavItemProps>) => {
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

      <Component
        className={clsxm(
          "flex h-[3.75rem] w-[3.75rem] items-center justify-center hover:text-white",
          "sm:h-9 sm:w-9",
          isActive && "text-green-500",
          className,
        )}
        aria-label={title}
        {...rest}
      >
        <div className="relative">
          {renderIcon(iconProps)}
          {count > 0 && (
            <Count
              count={count}
              className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
            />
          )}
        </div>
      </Component>
    </li>
  );
};

const NavItemLink = ({ href, ...rest }: NavItemProps & { href: string }) => {
  const isActive = href === usePathname();

  return <NavItem as={Link} href={href} isActive={isActive} {...rest} />;
};

export { NavItem, NavItemLink };
