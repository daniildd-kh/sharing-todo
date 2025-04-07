import React, { ReactNode, RefObject } from "react";
import { FieldError } from "react-hook-form";
import {
  SmallText,
  Text,
} from "../../../components/common/Typography/Typography";
import styles from "./InputForm.module.scss";

interface InputFormProps {
  text: string;
  error?: FieldError | undefined;
  children: ReactNode;
  ref?: RefObject<HTMLDivElement | null>;
  className?: string;
}

const InputForm = ({
  text,
  children,
  error,
  ref,
  className,
}: InputFormProps) => {
  return (
    <div ref={ref} className={className}>
      <Text>{text}</Text>
      {children}
      {error && <SmallText className={styles.error}>{error.message}</SmallText>}
    </div>
  );
};

export default InputForm;
