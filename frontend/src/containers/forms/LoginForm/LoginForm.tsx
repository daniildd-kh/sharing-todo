import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";
import { fetchLogin } from "../../../store/actions";
import { Link, useLocation, useNavigate } from "react-router";
import commonStyles from "../forms.module.scss";
import { object, ObjectSchema, string } from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createInputEmail } from "../../../components/common/Input/Input";
import {
  SmallText,
  Text,
  Title,
} from "../../../components/common/Typography/Typography";
import { Button } from "../../../components/common/Button/Button";
import { Logo } from "../../../components/common/Logo/Logo";
import InputForm from "../components/InputForm";
import Spinner from "../../../components/common/Loader/Spinner";
import InputPassword from "../../../components/common/Input/InputPassword";
import { useMemo } from "react";

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

  const { loading, error: errorStore } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const onSubmit: SubmitHandler<ILogin> = (data) => {
    dispatch(fetchLogin({ ...data }))
      .unwrap()
      .then(() => navigate(from, { replace: true }));
  };

  const InputEmail = useMemo(() => createInputEmail<ILogin>(), []);

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
        <div className={commonStyles.inputs}>
          <InputForm error={errors.email} text={"Почта"}>
            <InputEmail
              register={register}
              name="email"
              className={commonStyles.input}
            />
          </InputForm>
          <InputPassword
            register={register}
            name={"password"}
            className={commonStyles.input}
            error={errors.password}
          />
          {errorStore && (
            <SmallText className={commonStyles.error}>{errorStore}</SmallText>
          )}
        </div>
        <div className={commonStyles.options}>
          <Button type="submit" className={commonStyles.button}>
            {loading ? <Spinner /> : "Войти"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
