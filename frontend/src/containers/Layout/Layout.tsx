import React from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router";
import style from "./Layout.module.scss";

const Layout = () => {
  return (
    <div className={style.layout}>
      <Header />
      <main className={style.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
