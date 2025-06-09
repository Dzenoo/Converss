import Logo from "./Logo";
import NavList from "./list/NavList";
import NavActions from "./actions/NavActions";

const Header = () => {
  return (
    <header className="flex items-center justify-between gap-5 py-5 pr-10">
      <div className="relative right-5">
        <Logo />
      </div>

      <nav className="relative left-6">
        <NavList />
      </nav>

      <div>
        <NavActions />
      </div>
    </header>
  );
};

export default Header;
