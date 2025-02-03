import React from "react";
import style from "./Menu.module.scss";
import { Link } from "react-router";
import clsx from "clsx";

type LinkType = {
  text: string;
  to: string;
};

interface MenuProps {
  links: LinkType[];
  className?: string;
}

const Menu = ({ links, className }: MenuProps) => {
  return (
    <ul className={clsx(style.menu, className)}>
      {links &&
        links.map((link, index) => (
          <li key={index} className={style.menuItem}>
            <Link to={link.to} className={style.link}>
              {link.text}
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default Menu;
