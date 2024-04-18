"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavItem, type NavItemProps } from "./nav-item";

const NavItemLink = ({
  href,
  children,
  ...rest
}: NavItemProps & { href: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <NavItem asChild isActive={isActive} {...rest}>
      <Link href={href}>{children}</Link>
    </NavItem>
  );
};

export { NavItemLink };
