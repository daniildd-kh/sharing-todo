import React from "react";

import slider1 from "/slider-1.png";
import slider2 from "/slider-2.png";
import slider3 from "/slider-3.png";
import slider4 from "/slider-4.png";
import Slider from "./Slider";
import style from "./style.module.scss";
import { Title } from "../../../../components/common/Typography/Typography";

const IMAGES = [
  {
    url: slider1,
    alt: "Общие задачи",
    text: "Командная синхронизация",
  },
  {
    url: slider2,
    alt: "Все пользователи",
    text: "Онлайн-статусы пользователей",
  },
  {
    url: slider3,
    alt: "Профиль",
    text: "Профиль под твой стиль",
  },
  {
    url: slider4,
    alt: "Создание новой задачи",
    text: "Личный контроль",
  },
];

const DemoProduct = () => {
  return (
    <div id="product" className={style.section}>
      <Title className={style.title}>Демо продукта</Title>
      <div className={style.sliderContainer}>
        <Slider images={IMAGES} />
      </div>
    </div>
  );
};

export default DemoProduct;
