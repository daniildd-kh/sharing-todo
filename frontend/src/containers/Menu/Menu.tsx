import React from "react";
import style from "./Menu.module.scss";
import { Link } from "react-router";

type LinkType = {
  text: string;
  to: string;
};

interface MenuProps {
  links: LinkType[];
}

const Menu = ({ links }: MenuProps) => {
  return (
    <ul className={style.menu}>
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
