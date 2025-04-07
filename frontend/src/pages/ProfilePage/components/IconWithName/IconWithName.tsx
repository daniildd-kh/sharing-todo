import React from "react";
import {
  LargeText,
  SmallText,
} from "../../../../components/common/Typography/Typography";
import style from "./IconWithName.module.scss";

interface IconWithNamePrps {
  name: string;
  email: string;
}

const IconWithName = ({ name, email }: IconWithNamePrps) => {
  return (
    <div className={style.iconWithText}>
      <img src="/person.png" alt="avatar" width={80} height={80} />
      <div className={style.text}>
        <LargeText>{name}</LargeText>
        <SmallText>{email}</SmallText>
      </div>
    </div>
  );
};

export default IconWithName;
