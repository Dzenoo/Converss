import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/buttons/button";

const NavItem: React.FC<{
  title: string;
  tag: string;
}> = ({ title, tag }) => {
  return (
    <li>
      <Link
        href={tag}
        className="text-sm font-medium transition-all hover:text-[var(--primary-gray)]"
      >
        <Button variant="ghost">{title}</Button>
      </Link>
    </li>
  );
};

export default NavItem;
