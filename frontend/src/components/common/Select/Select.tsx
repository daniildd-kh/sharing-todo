import React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import style from "./Select.module.scss";

interface SelectProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  options: string[];
}

function Select<T extends FieldValues>({
  register,
  name,
  options,
}: SelectProps<T>) {
  return (
    <select className={style.select} {...register(name)}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default Select;
