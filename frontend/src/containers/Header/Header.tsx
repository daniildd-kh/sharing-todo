import React from "react";
import style from "./Header.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Menu from "../Menu/Menu";
import { LogoWithTitle } from "../../components/common/Logo/Logo";
import { Button } from "../../components/common/Button/Button";

const Header = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const menu = [
    { text: "Общие задачи", to: "genaral-tasks" },
    { text: "Все пользователи", to: "users" },
  ];

  return (
    <header className={style.header}>
      <LogoWithTitle title={"Sharing Todo"} />
      <div className={style.menuWithUser}>
        <Menu links={menu} />
        {user && (
          <Button className={style.user} icon={"angle"}>
            {user.name}
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
