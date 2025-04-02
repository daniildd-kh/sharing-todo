import React from "react";
import style from "./style.module.scss";
import { Text } from "../Typography/Typography";
import { IUserWithStatus } from "../../../pages/UsersPage";
import UserItem from "./UserItem";

const UserList = ({ users }: { users: IUserWithStatus[] }) => {
  return (
    <div className={style["table-wrapper"]}>
      <table className={style.table}>
        <thead className={style.head}>
          <tr className={style.headInner}>
            <th>
              <Text>Имя</Text>
            </th>
            <th>
              <Text>Email</Text>
            </th>
            <th>
              <Text>Статус</Text>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserItem
              key={user.email}
              name={user.name}
              email={user.email}
              status={user.status}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
