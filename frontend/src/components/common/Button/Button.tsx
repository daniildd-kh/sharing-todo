import React, { ReactElement, ReactNode } from "react";
import style from "./Button.module.scss";
import clsx from "clsx";
import IconSvg, { IconName } from "../Icons/IconSvg";

interface ButtonProps {
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: IconName;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const Button = ({
  children,
  onClick,
  className,
  icon,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(className, style.button, { [style.disabled]: disabled })}
      onClick={disabled ? undefined : onClick}
      {...props}
    >
      {children}
      {icon && <IconSvg name={icon} />}
    </button>
  );
};
