import { SignOutButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";

import Logo from "@/components/shared/Logo";

import { Button } from "@/components/ui/buttons/button";

const Header = () => {
  return (
    <header className="foreground flex items-center justify-between gap-5 border-b border-[var(--tertiary-gray)] py-4 pr-10">
      <div>
        <Logo />
      </div>

      <div>
        <SignOutButton>
          <Button variant="ghost" size="lg">
            <LogOut />
          </Button>
        </SignOutButton>
      </div>
    </header>
  );
};

export default Header;
