import React from "react";
import style from "./style.module.scss";
import Step from "./Step";
import IconSvg from "../../../../components/common/Icons/IconSvg";
import { Title } from "../../../../components/common/Typography/Typography";

const steps = [
  "Зарегистрируйтесь",
  "Создайте задачи",
  "Работайте вместе в реальном времени",
];

const HowWorks = () => {
  return (
    <div className={style.section}>
      <Title>Простой старт за 3 шага</Title>
      <div className={style.steps}>
        {steps.map((stepTitle, index) => (
          <React.Fragment key={index}>
            <Step step={index + 1} title={stepTitle} />
            {index !== steps.length - 1 && (
              <IconSvg name="angle" className={style.angle} size={80} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default HowWorks;
