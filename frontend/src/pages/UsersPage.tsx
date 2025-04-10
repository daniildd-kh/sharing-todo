import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchGetAllUsers } from "../store/actions";
import { IUser } from "../models";
import UserList from "../components/common/Users/UserList";
import TitlePage from "../components/common/TitlePage/TitlePage";

export type IUserWithStatus = IUser & { status: boolean };

const UsersPage = () => {
  const { users, onlineUsers, loading, error } = useSelector(
    (state: RootState) => state.users
  );
  const dispatch = useDispatch<AppDispatch>();
  const [usersWithStatus, setUsersWithStatus] = React.useState<
    IUserWithStatus[]
  >([]);
  useEffect(() => {
    dispatch(fetchGetAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users && onlineUsers) {
      setUsersWithStatus(
        users.map((user) => ({
          ...user,
          status: onlineUsers.some(
            (onlineUser) => onlineUser.email === user.email
          ),
        }))
      );
    }
  }, [users, onlineUsers]);
  return (
    <div>
      <TitlePage icon="users" title="Список пользователей" />
      {loading && <p>Загрузка...</p>}
      {users && onlineUsers && usersWithStatus.length > 0 && (
        <UserList users={usersWithStatus} />
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default UsersPage;
