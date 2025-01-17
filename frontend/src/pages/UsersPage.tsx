import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchGetAllUsers } from "../store/actions";

const UsersPage = () => {
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchGetAllUsers());
  }, [dispatch]);
  return (
    <div>
      <h1>Список пользователей</h1>
      {loading && <p>Загрузка...</p>}
      {users &&
        users.map((user) => (
          <li key={user.id} style={{listStyle: 'none'}}>
            <div>
              <p>{user.name}</p>
              <p>{user.email}</p>
            </div>
          </li>
        ))}
      {error && <p>{error}</p>}
    </div>
  );
};

export default UsersPage;
