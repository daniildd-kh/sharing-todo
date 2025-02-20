import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { fetchRegistration } from "../../../store/actions";
import { object, ObjectSchema, ref, string } from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  createInputBase,
  createInputEmail,
  createInputPassword,
} from "../../../components/common/Input/Input";
import {
  SmallText,
  Text,
} from "../../../components/common/Typography/Typography";
import styles from "./RegistrationForm.module.scss";
import commonStyles from "../forms.module.scss";
import { Logo } from "../../../components/common/Logo/Logo";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../../../components/common/Button/Button";

interface IRegistration {
  name: string;
  email: string;
  password: string;
  repeatedPassword: string;
}

const registrationSchema: ObjectSchema<IRegistration> = object({
  name: string().required("Введите имя"),
  email: string().email("Невалидный формат почты").required("Введите почту"),
  password: string()
    .min(6, "Длина пароля минимум 6 символов")
    .required("Введите пароль"),
  repeatedPassword: string()
    .oneOf([ref("password")], "Пароли не совпадают")
    .required("Повторно введите пароль"),
});

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistration>({
    resolver: yupResolver(registrationSchema),
  });
  // const dispatch = useDispatch<AppDispatch>();

  const Input = createInputBase<IRegistration>();
  const InputPassword = createInputPassword<IRegistration>();
  const InputEmail = createInputEmail<IRegistration>();

  const onSubmit: SubmitHandler<IRegistration> = (data) => {
    console.log(data);
    // dispatch(fetchRegistration({ name, email, password }));
  };

  return (
    <div className={commonStyles.container}>
      <div className={commonStyles.logo}>
        <Logo logoSize={36} />
      </div>
      <form
        className={commonStyles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div>
          <div>
            <Text>Имя</Text>
            <Input
              name="name"
              register={register}
              className={commonStyles.input}
            />
            {errors.name && <SmallText></SmallText>}
          </div>
          <div>
            <label>Email</label>
            <InputEmail register={register} name="email" />
          </div>
          <div>
            <Text>Пароль</Text>
            <InputPassword register={register} name="password" />
          </div>
          <div>
            <Text>Повторите пароль</Text>
            <InputPassword register={register} name="repeatedPassword" />
          </div>
        </div>

        <Button className={commonStyles.button} type="submit">
          Зарегистрироваться
        </Button>
      </form>
    </div>
  );
};

export default RegistrationForm;
