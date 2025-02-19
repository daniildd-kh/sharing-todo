import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { fetchLogin } from "../../store/actions";
import { Link, useLocation, useNavigate } from "react-router";
import styles from "./LoginFrom.module.scss";
import { object, ObjectSchema, string } from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createInputEmail, createInputPassword } from "../common/Input/Input";
import { SmallText, Text, Title } from "../common/Typography/Typography";
import { Button } from "../common/Button/Button";
import { useRef } from "react";
import { Logo } from "../common/Logo/Logo";

interface ILogin {
  email: string;
  password: string;
}

const loginSchema: ObjectSchema<ILogin> = object({
  email: string().email("Невалидный формат почты").required("Введите почту"),
  password: string()
    .min(6, "Длина пароля минимум 6 символов")
    .required("Введите пароль"),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: yupResolver(loginSchema),
  });

  const { loading, error } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const onSubmit: SubmitHandler<ILogin> = (data) => {
    dispatch(fetchLogin({ ...data }))
      .unwrap()
      .then(() => navigate(from, { replace: true }));
  };
  const inputRef = useRef<HTMLDivElement>(null);

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

  const InputEmail = createInputEmail<ILogin>();
  const InputPassword = createInputPassword<ILogin>();

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Logo logoSize={36} />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
        noValidate
      >
        <div className={styles.header}>
          {" "}
          <Title>Вход</Title>
          <Text>
            Если у вас еще нет аккаунта, вы можете{" "}
            <Link to="/registration">зарегистрироваться</Link>
          </Text>
        </div>
        <div className={styles.inputs}>
          <div>
            <Text>Почта</Text>
            <InputEmail
              register={register}
              name="email"
              className={styles.input}
            />
            {errors.email && (
              <SmallText className={styles.error}>
                {errors.email.message}
              </SmallText>
            )}
          </div>
          <div>
            <div ref={inputRef}>
              <Text>Пароль</Text>
              <InputPassword
                id="pass"
                register={register}
                name="password"
                className={styles.input}
              />
              {errors.password && (
                <SmallText className={styles.error}>
                  {errors.password.message}
                </SmallText>
              )}
            </div>
            <div className={styles.checkbox}>
              <input type="checkbox" onClick={showPassword} />{" "}
              <Text>Показать пароль</Text>
            </div>
          </div>
          {error && <SmallText style={{ color: "red" }}>{error}</SmallText>}
        </div>
        <div className={styles.options}>
          <Button type="submit" disabled={loading} className={styles.button}>
            Войти
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
