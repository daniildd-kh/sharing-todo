import React, { SetStateAction } from "react";
import style from "./Switch.module.scss";
import { Button } from "../../../../components/common/Button/Button";
import clsx from "clsx";

export type TodoSection = "user" | "general";

interface SwitchProps {
  activeTab: TodoSection;
  setActiveTab: React.Dispatch<SetStateAction<TodoSection>>;
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
        onClick={() => setActiveTab("general")}
        className={clsx(style.button, {
          [style.activeButton]: activeTab === "general",
        })}
      >
        Общие задачи
      </Button>
    </div>
  );
};

export default Switch;
