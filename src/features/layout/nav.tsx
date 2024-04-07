import Image from "next/image";
import Link from "next/link";
import {
  FiBarChart,
  FiCalendar,
  FiCheckSquare,
  FiSettings,
  FiUser,
} from "react-icons/fi";

import { APP_NAME } from "~/constants";

import { NavItemLink } from "./nav-item";

const Nav = () => {
  return (
    <nav className="left-3 right-3 bg-navy-800/50 max-md:fixed max-md:bottom-3 max-md:rounded-xl max-md:px-4 max-md:backdrop-blur-md md:flex md:flex-col md:items-center md:bg-navy-900">
      <Link href="/" className="my-6 block max-md:hidden">
        <Image
          src="/logo.svg"
          alt={APP_NAME}
          width={14}
          height={18}
          className="drop-shadow-neon"
        />
      </Link>

      <ul className="flex max-md:justify-between md:flex-col">
        <NavItemLink
          href="/"
          title="Schedule"
          renderIcon={(iconProps) => <FiCalendar {...iconProps} />}
        />
        <NavItemLink
          href="/tasks"
          title="Tasks"
          renderIcon={(iconProps) => <FiCheckSquare {...iconProps} />}
          count={7}
        />
        <NavItemLink
          href="/stats"
          title="Stats"
          renderIcon={(iconProps) => <FiBarChart {...iconProps} />}
        />
        <NavItemLink
          href="/settings"
          title="Settings"
          renderIcon={(iconProps) => <FiSettings {...iconProps} />}
        />
        <NavItemLink
          href="/account"
          title="Account"
          renderIcon={(iconProps) => <FiUser {...iconProps} />}
        />
      </ul>
    </nav>
  );
};

export { Nav };
