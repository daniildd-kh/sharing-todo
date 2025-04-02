import React from "react";
import IconSvg, { IconName } from "../Icons/IconSvg";
import { Title } from "../Typography/Typography";
import style from "./TitlePage.module.scss";

interface TitlePageProps {
  title: string;
  icon: IconName;
}

const TitlePage = ({ title, icon }: TitlePageProps) => {
  return (
    <span className={style.title}>
      <IconSvg name={icon} size={36} />
      <Title>{title}</Title>
    </span>
  );
};

export default TitlePage;
