import React from "react";
import style from "./Logo.module.scss";
import IconSvg from "../Icons/IconSvg";
import { LargeText, Text } from "../Typography/Typography";

export const Logo = () => {
  return (
    <div className={style.logo}>
      <IconSvg name="todo" size={24} />
    </div>
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
