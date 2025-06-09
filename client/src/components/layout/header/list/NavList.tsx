import React from "react";
import NavItem from "./NavItem";

const NavListData = [
  {
    id: 1,
    title: "Home",
    tag: "",
  },
  {
    id: 2,
    title: "Features",
    tag: "features",
  },
  {
    id: 3,
    title: "Pricing",
    tag: "pricing",
  },
  {
    id: 4,
    title: "FAQ",
    tag: "faq",
  },
];

const NavList = () => {
  return (
    <ul className="flex items-center gap-2">
      {NavListData.map((item) => (
        <NavItem key={item.id} {...item} />
      ))}
    </ul>
  );
};

export default NavList;
