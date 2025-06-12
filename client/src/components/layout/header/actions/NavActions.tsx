import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/buttons/button";

const NavActions = () => {
  return (
    <div className="flex items-center gap-2">
      <Link href="/" className="hidden md:block">
        <Button variant="outline" size="lg">
          Get Started
        </Button>
      </Link>

      <Link href="/">
        <Button
          className="bg-[var(--primary-blue)] hover:bg-[var(--secondary-blue)]"
          size="lg"
        >
          Login
        </Button>
      </Link>
    </div>
  );
};

export default NavActions;
