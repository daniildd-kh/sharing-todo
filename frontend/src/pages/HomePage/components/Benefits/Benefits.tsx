import React from "react";
import Benefit from "./Benefit";
import { IconName } from "../../../../components/common/Icons/IconSvg";
import style from "./style.module.scss";
import { Title } from "../../../../components/common/Typography/Typography";

const benefitsArray: { icon: IconName; title: string }[] = [
  { icon: "checkbox", title: "Гибкие статусы задач" },
  { icon: "usersTwo", title: "Общие задачи" },
  { icon: "synch", title: "Онлайн-синхронизация" },
  { icon: "overview", title: "Список пользователей" },
];

const Benefits = () => {
  return (
    <div className={style.section}>
      <Title>Почему именно наш To-Do?</Title>
      <div className={style.benefits}>
        {benefitsArray.map((benefit, index) => (
          <Benefit icon={benefit.icon} title={benefit.title} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Benefits;
