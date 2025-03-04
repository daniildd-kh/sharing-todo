import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { RootState } from "../store/store";
import { fetchLogout } from "../store/actions";
import { NavLink } from "react-router";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, status } = useSelector((state: RootState) => state.auth);
  const { onlineUsers } = useSelector((state: RootState) => state.users);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {status && <p>Статус пользователя: {status}</p>}
      <h1>Пользователи онлайн:</h1>
      {onlineUsers.length > 0 &&
        onlineUsers.map((userObj) => (
          <p key={userObj.email}>{userObj.email}</p>
        ))}{" "}
      {!user && <NavLink to="/login">Войти</NavLink>}
      {!user && <NavLink to="/registration">Регистрация</NavLink>}
      <NavLink to="/users">Все пользователи</NavLink>
      {user && <button onClick={() => dispatch(fetchLogout())}>Выйти</button>}
    </div>
  );
};

export default HomePage;
