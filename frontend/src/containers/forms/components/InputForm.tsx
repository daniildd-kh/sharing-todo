import React, { ReactNode, RefObject } from "react";
import { FieldError } from "react-hook-form";
import {
  SmallText,
  Text,
} from "../../../components/common/Typography/Typography";
import styles from "./InputForm.module.scss";

interface InputFormProps {
  text: string;
  error: FieldError | undefined;
  children: ReactNode;
  ref?: RefObject<HTMLDivElement | null>;
}

const InputForm = ({ text, children, error, ref }: InputFormProps) => {
  return (
    <div ref={ref}>
      <Text>{text}</Text>
      {children}
      {error && <SmallText className={styles.error}>{error.message}</SmallText>}
    </div>
  );
};

export default InputForm;
