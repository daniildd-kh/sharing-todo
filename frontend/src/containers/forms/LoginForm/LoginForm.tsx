import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";
import { fetchLogin } from "../../../store/actions";
import { Link, useLocation, useNavigate } from "react-router";
import styles from "./LoginFrom.module.scss";
import commonStyles from "../forms.module.scss";
import { object, ObjectSchema, string } from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  createInputEmail,
  createInputPassword,
} from "../../../components/common/Input/Input";
import {
  SmallText,
  Text,
  Title,
} from "../../../components/common/Typography/Typography";
import { Button } from "../../../components/common/Button/Button";
import { useRef } from "react";
import { Logo } from "../../../components/common/Logo/Logo";
import InputForm from "../components/InputForm";

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
    <div className={commonStyles.container}>
      <div className={commonStyles.logo}>
        <Logo logoSize={36} />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={commonStyles.form}
        noValidate
      >
        <div className={commonStyles.header}>
          {" "}
          <Title>Вход</Title>
          <Text>
            Если у вас еще нет аккаунта, вы можете{" "}
            <Link to="/registration">зарегистрироваться</Link>
          </Text>
        </div>
        <div className={styles.inputs}>
          <InputForm error={errors.email} text={"Почта"}>
            <InputEmail
              register={register}
              name="email"
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
          <div>
            <div className={styles.checkbox}>
              <input type="checkbox" onClick={showPassword} />{" "}
              <Text>Показать пароль</Text>
            </div>
          </div>
          {error && (
            <SmallText className={commonStyles.error}>{error}</SmallText>
          )}
        </div>
        <div className={styles.options}>
          <Button
            type="submit"
            disabled={loading}
            className={commonStyles.button}
          >
            Войти
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
