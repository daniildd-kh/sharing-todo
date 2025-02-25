import React from "react";
import style from "./Header.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Menu from "../Menu/Menu";
import { LogoWithTitle } from "../../components/common/Logo/Logo";
import { Button } from "../../components/common/Button/Button";
import AccordionWithTrigger from "../../components/common/Accordion/AccordionWithTrigger";

const Header = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const menu = [
    { text: "Общие задачи", to: "genaral-tasks" },
    { text: "Все пользователи", to: "users" },
  ];

  const menuProfile = [
    { text: "Мои задачи", to: "/todo" },
    { text: "Профиль", to: "/profile" },
    { text: "Выйти", to: "/logout", logout: true },
  ];

  return (
    <header className={style.header}>
      <LogoWithTitle title={"Sharing Todo"} />
      <div className={style.menuWithUser}>
        <Menu links={menu} />
        {user && (
          <AccordionWithTrigger
            trigger={
              <Button className={style.user} icon={"angle"}>
                {user.name}
              </Button>
            }
          >
            <Menu links={menuProfile} vertical={true} />
          </AccordionWithTrigger>
        )}
      </div>
    </header>
  );
};

export default Header;
