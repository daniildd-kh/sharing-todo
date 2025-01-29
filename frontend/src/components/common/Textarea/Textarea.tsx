import React, { ChangeEvent, useRef } from "react";
import style from "./Textarea.module.scss";

interface TextareaProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  name?: string;
}

const Textarea = ({ value, onChange, name, ...props }: TextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    onChange?.(e);
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      name={name}
      className={style.textarea}
      {...props}
    />
  );
};

export default Textarea;
