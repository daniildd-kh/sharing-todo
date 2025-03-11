import React, { SetStateAction } from "react";
import style from "./Switch.module.scss";
import { Button } from "../../../../components/common/Button/Button";
import clsx from "clsx";

interface SwitchProps {
  activeTab: string;
  setActiveTab: React.Dispatch<SetStateAction<string>>;
}

const Switch = ({ activeTab, setActiveTab }: SwitchProps) => {
  return (
    <div className={style.switch}>
      <Button
        onClick={() => setActiveTab("user")}
        className={clsx(style.button, {
          [style.activeButton]: activeTab === "user",
        })}
      >
        Входящие
      </Button>
      <Button
        onClick={() => setActiveTab("common")}
        className={clsx(style.button, {
          [style.activeButton]: activeTab === "common",
        })}
      >
        Общие задачи
      </Button>
    </div>
  );
};

export default Switch;
