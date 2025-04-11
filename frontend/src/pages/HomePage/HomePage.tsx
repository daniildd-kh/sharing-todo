import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { RootState } from "../../store/store";
import { fetchLogout } from "../../store/actions";
import { NavLink } from "react-router";
import Hero from "./components/Hero/Hero";
import Benefits from "./components/Benefits/Benefits";
import HowWorks from "./components/HowWorks/HowWorks";
import style from "./style.module.scss";
import DemoProduct from "./components/DemoProduct/DemoProduct";

const HomePage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Hero />
      <div className={style.diffSection}>
        <Benefits />
        <HowWorks />
      </div>
      <DemoProduct />
    </div>
  );
};

export default HomePage;
