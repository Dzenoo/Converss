import Logo from "@/components/shared/Logo";

const Header = () => {
  return (
    <header className="foreground border-b border-[var(--tertiary-gray)] py-4">
      <div>
        <Logo />
      </div>
    </header>
  );
};

export default Header;
