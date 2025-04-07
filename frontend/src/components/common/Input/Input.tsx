import React from "react";
import clsx from "clsx";
import style from "./Input.module.scss";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type inputVariant = "text" | "password" | "email";
type inputStyle = "baseText" | "title";

export interface InputProps<T extends FieldValues>
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
  > {
  inputType?: inputVariant;
  className?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  placeholder?: string;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  styleType?: inputStyle;
  defaultValue?: string;
}

function withInput<T extends FieldValues>(defaults: Partial<InputProps<T>>) {
  return function Input(props: InputProps<T>) {
    const {
      inputType = defaults.inputType || "text",
      className,
      placeholder,
      onClick,
      name,
      register,
      styleType = defaults.styleType || "title",
      defaultValue,
      ...rest
    } = props;

    const registeredProps = register(name);

    return (
      <input
        {...registeredProps}
        className={clsx(
          style.input,
          style[styleType],
          { disabled: [style.disabled] },
          className
        )}
        placeholder={placeholder}
        type={inputType}
        onClick={onClick}
        defaultValue={defaultValue ?? ""}
        {...rest}
      />
    );
  };
}

export const createInput = <T extends FieldValues>() => withInput<T>({});
export const createInputBase = <T extends FieldValues>() =>
  withInput<T>({ styleType: "baseText" });
export const createInputEmail = <T extends FieldValues>() =>
  withInput<T>({ styleType: "baseText", inputType: "email" });
export const createInputPassword = <T extends FieldValues>() =>
  withInput<T>({ styleType: "baseText", inputType: "password" });
