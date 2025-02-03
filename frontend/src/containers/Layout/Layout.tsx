import Header from "../Header/Header";
import { Outlet } from "react-router";
import style from "./Layout.module.scss";
import Footer from "../Footer/Footer";

const Layout = () => {
  return (
    <div className={style.layout}>
      <Header />
      <main className={style.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
