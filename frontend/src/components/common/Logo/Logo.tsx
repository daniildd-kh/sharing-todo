import React from "react";
import style from "./Logo.module.scss";
import IconSvg from "../Icons/IconSvg";
import { Text } from "../Typography/Typography";
import { Link } from "react-router";

interface LogoProps {
  logoSize?: number;
}

export const Logo = ({ logoSize }: LogoProps) => {
  return (
    <Link
      className={style.logo}
      to="/"
      style={{
        width: logoSize ? logoSize * 2 : 40,
        height: logoSize ? logoSize * 2 : 40,
      }}
    >
      <IconSvg name="todo" size={logoSize ? logoSize : 24} />
    </Link>
  );
};

export const LogoWithTitle = ({ title }: { title: string }) => {
  return (
    <div className={style.logoContainer}>
      <Logo />
      <Text className={style.text}>{title}</Text>
    </div>
  );
};
