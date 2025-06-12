import { scrollToSection } from "@/lib/utils";

import { Button } from "@/components/ui/buttons/button";

const NavItem: React.FC<{
  title: string;
  tag: string;
}> = ({ title, tag }) => {
  return (
    <li>
      <Button
        variant="ghost"
        className="text-sm font-medium"
        onClick={() => scrollToSection(tag)}
      >
        {title}
      </Button>
    </li>
  );
};

export default NavItem;
