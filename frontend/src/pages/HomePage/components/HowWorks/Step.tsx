import React from "react";
import style from "./style.module.scss";
import { LargeText } from "../../../../components/common/Typography/Typography";

interface StepProps {
  step: number;
  title: string;
}

const Step = ({ step, title }: StepProps) => {
  return (
    <div className={style.step}>
      <div className={style.number}>{step}</div>
      <LargeText className={style.title}>{title}</LargeText>
    </div>
  );
};

export default Step;
