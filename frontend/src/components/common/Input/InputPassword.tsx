import React, { useMemo, useRef } from "react";
import { createInputPassword } from "./Input";
import {
  FieldValues,
  Path,
  UseFormRegister,
  FieldError,
} from "react-hook-form";
import InputForm from "../../../containers/forms/components/InputForm";
import style from "./Input.module.scss";
import { Text } from "../Typography/Typography";

interface InputPasswordProps<T extends FieldValues> {
  className?: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  error?: FieldError;
}

function InputPassword<T extends FieldValues>({
  className,
  register,
  name,
  error,
}: InputPasswordProps<T>) {
  const inputRef = useRef<HTMLDivElement>(null);

  const PasswordInput = useMemo(() => createInputPassword<T>(), []);

  const showPassword = () => {
    if (inputRef.current) {
      const passRef = inputRef.current.querySelector(
        "#pass"
      ) as HTMLInputElement;
      if (passRef?.type === "password") {
        passRef.type = "text";
      } else {
        passRef.type = "password";
      }
    }
  };

  return (
    <>
      <InputForm error={error} text="Пароль" ref={inputRef}>
        <PasswordInput
          register={register}
          className={className}
          name={name}
          id="pass"
        />
      </InputForm>
      <div className={style.checkbox}>
        <input type="checkbox" onClick={showPassword} />
        <Text>Показать пароль</Text>
      </div>
    </>
  );
}

export default InputPassword;
