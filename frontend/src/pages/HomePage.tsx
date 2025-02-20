import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { RootState } from "../store/store";
import { fetchLogout } from "../store/actions";
import { NavLink } from "react-router";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [status, setStatus] = useState("offline");
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  const userId = user?._id;

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");

    ws.onopen = () => {
      console.log("WebSocket открыт");
      if (userId) {
        ws.send(JSON.stringify({ userId, status: "online" }));
        setStatus("online");
      }
    };

    ws.onclose = () => {
      console.log("WebSocket закрыт");
      if (userId) {
        ws.send(JSON.stringify({ userId, status: "offline" }));
        setStatus("offline");
      }
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        console.log("Полученные данные:", data);

        if (data.type === "update_users") {
          setOnlineUsers(data.users);
        }
      } catch (error) {
        console.error("Ошибка обработки WebSocket-сообщения:", error);
      }
    };

    return () => {
      ws.close();
    };
  }, [userId]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <p>Статус: {status}</p>
      {user && <p>{`Добро пожаловать, ${userId}`}</p>}
      <h3>Пользователи онлайн:</h3>
      <ul>
        {onlineUsers.length > 0 ? (
          onlineUsers.map((id) => <li key={id}>{id}</li>)
        ) : (
          <p>Никого нет в сети</p>
        )}
      </ul>
      {!user && <NavLink to="/login">Войти</NavLink>}
      {!user && <NavLink to="/registration">Регистрация</NavLink>}
      <NavLink to="/users">Все пользователи</NavLink>
      {user && <button onClick={() => dispatch(fetchLogout())}>Выйти</button>}
    </div>
  );
};

export default HomePage;
