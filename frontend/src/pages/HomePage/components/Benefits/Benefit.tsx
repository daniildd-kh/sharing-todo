import React from "react";
import style from "./style.module.scss";
import IconSvg, { IconName } from "../../../../components/common/Icons/IconSvg";
import {
  LargeText,
  Text,
} from "../../../../components/common/Typography/Typography";

interface BenefitProps {
  icon: IconName;
  title: string;
}

const Benefit = ({ icon, title }: BenefitProps) => {
  return (
    <div className={style.benefit}>
      <IconSvg name={icon} size={40} />
      <LargeText className={style.text}>{title}</LargeText>
    </div>
  );
};

export default Benefit;
