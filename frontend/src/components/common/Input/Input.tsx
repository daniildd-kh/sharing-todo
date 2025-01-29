import React, { ChangeEvent, ReactHTMLElement } from "react";
import clsx from "clsx";
import style from "./Input.module.scss";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type inputVariant = "text" | "password" | "email";
type inputStyle = "baseText" | "title";

interface InputProps<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  inputType?: inputVariant;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name: Path<T>;
  register?: UseFormRegister<T>;
  placeholder?: string;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  styleType?: inputStyle;
}

function withInput<T extends FieldValues>(defaults: Partial<InputProps<T>>) {
  return function Input({
    inputType = defaults.inputType || "text",
    value,
    className,
    placeholder,
    onClick,
    onChange,
    name,
    register,
    styleType = defaults.styleType || "title",
    ...props
  }: InputProps<T>) {
    return (
      <input
        value={value}
        {...(register ? register(name) : {})}
        onClick={onClick}
        className={clsx(style[styleType], style.input, className)}
        placeholder={placeholder}
        onChange={onChange}
        type={inputType}
        name={name}
        {...props}
      />
    );
  };
}

export const createInput = <T extends FieldValues>() => withInput<T>({});
export const createInputBase = <T extends FieldValues>() =>
  withInput<T>({ styleType: "baseText" });
