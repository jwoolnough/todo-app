import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
  FiBarChart,
  FiCalendar,
  FiCheckSquare,
  FiLogOut,
  FiMoon,
  FiSettings,
} from "react-icons/fi";

import { clsxm } from "@/utils/clsxm";

import { NavItem, NavItemLink } from "./nav-item";

const NavList = ({
  className,
  children,
}: WithChildren & { className?: string }) => (
  <ul className={clsxm("flex w-full gap-4 sm:flex-col", className)}>
    {children}
  </ul>
);

const Nav = ({ className }: { className?: string }) => (
  <nav
    className={clsxm(
      "flex-col items-center max-sm:row-start-2 sm:row-span-full sm:flex sm:w-[3.75rem] sm:border-r sm:bg-slate-900 sm:py-6",
      className,
    )}
  >
    <Link href="/" className="mb-[2.375rem] max-sm:hidden">
      <Image src="/img/logo.svg" alt="Todo+" width={27} height={27} />
    </Link>

    <NavList>
      <NavItemLink
        title="Dashboard"
        href="/"
        renderIcon={(props) => <FiCalendar {...props} />}
      />
      <NavItemLink
        title="Tasks"
        href="/tasks"
        renderIcon={(props) => <FiCheckSquare {...props} />}
        count={8}
      />
      <NavItemLink
        title="Progress"
        href="/progress"
        renderIcon={(props) => <FiBarChart {...props} />}
      />
      <NavItemLink
        title="Settings"
        href="/settings"
        renderIcon={(props) => <FiSettings {...props} />}
      />
    </NavList>

    <NavList className="mt-auto text-slate-700 max-sm:hidden">
      <NavItem
        type="button"
        className="hover:text-slate-400"
        title="Switch to light mode"
        renderIcon={(props) => <FiMoon {...props} />}
      />
      <NavItem
        type="button"
        className="hover:text-slate-400"
        title="Log out"
        onClick={() => void signOut()}
        renderIcon={(props) => <FiLogOut {...props} />}
      />
    </NavList>
  </nav>
);

export { Nav };
