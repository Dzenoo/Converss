import Logo from "./Logo";
import NavList from "./list/NavList";
import NavActions from "./actions/NavActions";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-5 bg-white py-5 pr-10">
      <div className="relative right-5">
        <Logo />
      </div>

      <nav className="relative left-6 hidden lg:block">
        <NavList />
      </nav>

      <div>
        <NavActions />
      </div>
    </header>
  );
};

export default Header;
