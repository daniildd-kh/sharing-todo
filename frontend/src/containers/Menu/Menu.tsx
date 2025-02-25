import React from "react";
import style from "./Menu.module.scss";
import { Link } from "react-router";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { fetchLogout } from "../../store/actions";
import { AppDispatch } from "../../store/store";

type LinkType = {
  text: string;
  to: string;
  logout?: boolean;
};

interface MenuProps {
  links: LinkType[];
  className?: string;
  vertical?: boolean;
}

const Menu = ({ links, className, vertical = false }: MenuProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLinkClick = (logout?: boolean) => {
    if (logout) {
      dispatch(fetchLogout());
    }
  };

  return (
    <ul className={clsx(style.menu, className, { [style.vertical]: vertical })}>
      {links.map((link, index) => (
        <li key={index} className={style.menuItem}>
          {link.logout ? (
            <a className={style.link} onClick={() => handleLinkClick(true)}>
              {link.text}
            </a>
          ) : (
            <Link
              to={link.to}
              className={style.link}
              onClick={() => handleLinkClick(false)}
            >
              {link.text}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Menu;
