import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { RootState } from "../store/store";
import LoginForm from "../components/LoginForm";
import { fetchLogout } from "../store/actions";
import RegistrationForm from "../components/RegistrationForm";
import { NavLink, useLocation } from "react-router";
import { Task } from "../components/common/Task/Task";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {user && <p>{`Добро пожаловать${user?.name}`}</p>}
      <div
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      ></div>
      {!user && <NavLink to="/login">Войти</NavLink>}
      <NavLink to="/users">Все пользователи</NavLink>
      {user && <button onClick={() => dispatch(fetchLogout())}>Выйти</button>}
    </div>
  );
};

export default HomePage;
