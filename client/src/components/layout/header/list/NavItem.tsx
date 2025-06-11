import { Button } from "@/components/ui/buttons/button";

const NavItem: React.FC<{
  title: string;
  tag: string;
}> = ({ title, tag }) => {
  function scrollToSection() {
    const element = document.getElementById(tag);
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <li>
      <Button
        variant="ghost"
        className="text-sm font-medium"
        onClick={scrollToSection}
      >
        {title}
      </Button>
    </li>
  );
};

export default NavItem;
