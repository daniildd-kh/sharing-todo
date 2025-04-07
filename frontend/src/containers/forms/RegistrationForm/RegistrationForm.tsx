import { useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
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
  Title,
} from "../../../components/common/Typography/Typography";
import styles from "./RegistrationForm.module.scss";
import commonStyles from "../forms.module.scss";
import { Logo } from "../../../components/common/Logo/Logo";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../../../components/common/Button/Button";
import InputForm from "../components/InputForm";
import { Link } from "react-router";
import clsx from "clsx";
import Spinner from "../../../components/common/Loader/Spinner";

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
  const dispatch = useDispatch<AppDispatch>();
  const inputRef = useRef<HTMLDivElement>(null);
  const { loading, error: errorStore } = useSelector(
    (state: RootState) => state.auth
  );

  const showPassword = () => {
    if (inputRef.current) {
      const passRef = inputRef.current.querySelector(
        "#pass"
      ) as HTMLInputElement;
      if (passRef.type === "password") {
        passRef.type = "text";
      } else {
        passRef.type = "password";
      }
    }
  };

  const Input = useMemo(() => createInputBase<IRegistration>(), []);
  const InputPassword = useMemo(() => createInputPassword<IRegistration>(), []);
  const InputEmail = useMemo(() => createInputEmail<IRegistration>(), []);

  const onSubmit: SubmitHandler<IRegistration> = (data) => {
    const { name, email, password } = data;
    dispatch(fetchRegistration({ name, email, password }));
  };

  return (
    <div className={clsx(commonStyles.container, styles.regContainer)}>
      <div className={commonStyles.logo}>
        <Logo logoSize={36} />
      </div>
      <form
        className={clsx(commonStyles.form, styles.regForm)}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div>
          <Title>Регистрация</Title>
          <Text>
            Если у вас уже есть аккаунт, вы можете{" "}
            <Link to="/login">войти</Link>
          </Text>
        </div>
        <div className={clsx(commonStyles.inputs, styles.regInputs)}>
          <InputForm error={errors.name} text={"Имя"}>
            <Input
              name="name"
              register={register}
              className={commonStyles.input}
            />
          </InputForm>
          <InputForm error={errors.email} text={"Email"}>
            <InputEmail
              name="email"
              register={register}
              className={commonStyles.input}
            />
          </InputForm>
          <InputForm error={errors.password} text={"Пароль"} ref={inputRef}>
            <InputPassword
              id="pass"
              register={register}
              name="password"
              className={commonStyles.input}
            />
          </InputForm>
          <div className={commonStyles.checkbox}>
            <input type="checkbox" onClick={showPassword} />{" "}
            <Text>Показать пароль</Text>
          </div>
          <InputForm error={errors.repeatedPassword} text={"Повторите пароль"}>
            <InputPassword
              register={register}
              name="repeatedPassword"
              className={commonStyles.input}
            />
          </InputForm>
          {errorStore && (
            <SmallText className={commonStyles.error}>{errorStore}</SmallText>
          )}
        </div>
        <div className={commonStyles.options}>
          <Button className={commonStyles.button} type="submit">
            {loading ? <Spinner /> : "Зарегистрироваться"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
