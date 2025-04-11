import React from "react";
import {
  ExtraTitle,
  LargeText,
  Title,
} from "../../../../components/common/Typography/Typography";
import { Button } from "../../../../components/common/Button/Button";
import style from "./style.module.scss";
import clsx from "clsx";
import { Link } from "react-router";

const Hero = () => {
  return (
    <div className={style.hero}>
      <div className={style.heroTitle}>
        <ExtraTitle>To-Do платформа для личных и командных задач</ExtraTitle>
        <LargeText style={{ fontWeight: "normal" }}>
          Создавайте задачи, назначайте авторов, работайте в реальном времени.
        </LargeText>
        <div className={style.heroButtons}>
          <Link to="/registration" style={{ all: "unset" }}>
            <Button
              className={clsx(style.button, style.buttonReg)}
              type="button"
            >
              Зарегистрироваться
            </Button>
          </Link>
          <a href="#product" style={{ all: "unset" }}>
            <Button
              className={clsx(style.button, style.buttonMore)}
              type="button"
            >
              Узнать больше
            </Button>
          </a>
        </div>
      </div>
      <div className={style.imgContainer}>
        <img
          alt="Изображение общих задач"
          src="/img-common-tasks.png"
          className={style.img}
        />
      </div>
    </div>
  );
};

export default Hero;
