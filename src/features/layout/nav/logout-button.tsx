"use client";

import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

import { NavItem, NavItemIcon } from "./nav-item";

const LogoutButton = () => {
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <NavItem title="Log out" className="text-navy-500" onClick={handleLogout}>
      <NavItemIcon renderIcon={(iconProps) => <FiLogOut {...iconProps} />} />
    </NavItem>
  );
};

export { LogoutButton };
