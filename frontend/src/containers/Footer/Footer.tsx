import React from "react";
import style from "./Footer.module.scss";
import { LogoWithTitle } from "../../components/common/Logo/Logo";
import Menu from "../Menu/Menu";
import IconSvg from "../../components/common/Icons/IconSvg";
import ExternalLink from "../../components/common/ExternalLink/ExternalLink";

const menu = [
  { text: "Главная", to: "/" },
  { text: "Общие задачи", to: "genaral-tasks" },
  { text: "Все пользователи", to: "users" },
  { text: "Профиль", to: "profile" },
];

const Footer = () => {
  return (
    <div className={style.footer}>
      <LogoWithTitle title={"Sharing Todo"} />
      <div className={style.verticalDivider}></div>
      <div className={style.menu}>
        <Menu links={menu} />
      </div>
      <div className={style.verticalDivider}></div>
      <div className={style.contact}>
        <ExternalLink href="https://daniilkhromov.ru/contacts">
          Связаться со мной
        </ExternalLink>
        <p style={{ fontSize: 14 }}>© 2025 Sharing todo by Daniil Khromov</p>
      </div>
    </div>
  );
};

export default Footer;
