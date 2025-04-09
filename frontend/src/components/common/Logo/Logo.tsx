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
    <div
      className={style.logo}
      style={{
        width: logoSize ? logoSize * 2 : 40,
        height: logoSize ? logoSize * 2 : 40,
      }}
    >
      <IconSvg name="todo" size={logoSize ? logoSize : 24} />
    </div>
  );
};

export const LogoWithTitle = ({ title }: { title: string }) => {
  return (
    <Link className={style.logoContainer} to="/">
      <Logo />

      <Text className={style.text}>{title}</Text>
    </Link>
  );
};
