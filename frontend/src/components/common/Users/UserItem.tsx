import React from "react";
import { Text } from "../Typography/Typography";
import style from "./style.module.scss";
import clsx from "clsx";

interface UserItemProps {
  name: string;
  email: string;
  status: boolean;
}

const UserItem = ({ name, email, status }: UserItemProps) => {
  return (
    <tr>
      <td>
        <Text>{name}</Text>
      </td>
      <td>
        <Text>{email}</Text>
      </td>
      <td className={style.bodyItem}>
        <Text
          className={clsx(style.status, status ? style.online : style.offline)}
        >
          {status ? "Онлайн" : "Оффлайн"}
        </Text>
      </td>
    </tr>
  );
};

export default UserItem;
