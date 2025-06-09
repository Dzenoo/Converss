import React from "react";

import { Button } from "@/components/ui/buttons/button";

const NavActions = () => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline">Get Started</Button>
      <Button className="bg-[var(--primary-blue)] hover:bg-[var(--secondary-blue)]">
        Login
      </Button>
    </div>
  );
};

export default NavActions;
