import Image from "next/image";
import Link from "next/link";
import {
  FiBarChart,
  FiCalendar,
  FiCheckSquare,
  FiSettings,
  FiUser,
} from "react-icons/fi";

import { Count } from "~/components";
import { APP_NAME } from "~/constants";
import { cn } from "~/utils";

import { LogoutButton } from "./logout-button";
import { NavItemIcon } from "./nav-item";
import { NavItemLink } from "./nav-link";

const NavList = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => (
  <ul className={cn("flex max-md:justify-between md:flex-col", className)}>
    {children}
  </ul>
);

const Nav = () => {
  return (
    <nav className="left-3 right-3 z-50 bg-navy-500/25 max-md:fixed max-md:bottom-3 max-md:rounded-xl max-md:px-4 max-md:shadow-lg max-md:backdrop-blur-md max-md:backdrop-brightness-90 md:flex md:flex-col md:items-center md:bg-navy-900">
      <Link href="/" className="my-6 block max-md:hidden">
        <Image
          src="/logo.svg"
          alt={APP_NAME}
          width={14}
          height={18}
          className="drop-shadow-neon"
          priority
        />
      </Link>

      <NavList className="md:mb-6">
        <NavItemLink href="/" title="Schedule">
          <NavItemIcon
            renderIcon={(iconProps) => <FiCalendar {...iconProps} />}
          />
        </NavItemLink>
        {false && <NavItemLink href="/tasks" title="Tasks">
          <div className="relative">
            <NavItemIcon
              renderIcon={(iconProps) => <FiCheckSquare {...iconProps} />}
            />
            <Count count={5} className="absolute -left-2 -top-2" />
          </div>
        </NavItemLink>}
        {false && <NavItemLink href="/stats" title="Stats">
          <NavItemIcon
            renderIcon={(iconProps) => <FiBarChart {...iconProps} />}
          />
        </NavItemLink>}
        <NavItemLink href="/settings" title="Settings">
          <NavItemIcon
            renderIcon={(iconProps) => <FiSettings {...iconProps} />}
          />
        </NavItemLink>
        <NavItemLink href="/account" title="Account">
          <NavItemIcon renderIcon={(iconProps) => <FiUser {...iconProps} />} />
        </NavItemLink>
      </NavList>

      <NavList className="mt-auto max-md:hidden md:mb-1">
        <LogoutButton />
      </NavList>
    </nav>
  );
};

export { Nav };
