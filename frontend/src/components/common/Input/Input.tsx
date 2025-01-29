import React, { ChangeEvent, ReactHTMLElement } from "react";
import clsx from "clsx";
import style from "./Input.module.scss";

type inputVariant = "text" | "password" | "email";
type inputStyle = "baseText" | "title";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputType?: inputVariant;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  name?: string;
  styleType?: inputStyle;
}

function withInput(defaults: InputProps) {
  return function Input({
    inputType = defaults.inputType || "text",
    value,
    onChange,
    className,
    placeholder,
    onClick,
    name,
    styleType = defaults.styleType || "title",
    ...props
  }: InputProps) {
    return (
      <input
        value={value}
        name={name}
        onClick={onClick}
        className={clsx(style[styleType], style.input, className)}
        placeholder={placeholder}
        onChange={onChange}
        type={inputType}
        {...props}
      />
    );
  };
}

export const Input = withInput({});
export const InputBase = withInput({ styleType: "baseText" });
