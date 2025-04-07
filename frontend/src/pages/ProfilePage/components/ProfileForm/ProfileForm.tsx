import React, { useEffect, useMemo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import style from "./ProfileForm.module.scss";
import InputForm from "../../../../containers/forms/components/InputForm";
import {
  createInputBase,
  createInputEmail,
} from "../../../../components/common/Input/Input";
import Select from "../../../../components/common/Select/Select";
import InputPassword from "../../../../components/common/Input/InputPassword";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { GenderEnum, IUser, LanguageEnum } from "../../../../models";
import { Button } from "../../../../components/common/Button/Button";
import Spinner from "../../../../components/common/Loader/Spinner";
import { SmallText } from "../../../../components/common/Typography/Typography";

type IProfile = IUser & { password: string };

const ProfileForm = () => {
  const { user, error: errorStore } = useSelector(
    (state: RootState) => state.auth
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<IProfile>({
    defaultValues: {
      fullName: "",
      name: "",
      country: "",
      language: LanguageEnum.russian,
      gender: GenderEnum.male,
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName || "",
        name: user.name,
        country: user.country || "",
        language: user.language || LanguageEnum.russian,
        gender: user.gender || GenderEnum.male,
        email: user.email,
        password: "",
      });
    }
  }, [user, reset]);

  const onSubmit: SubmitHandler<IProfile> = async (data) => {
    try {
      console.log("Обновлённые данные пользователя:", data);
      reset(data);
    } catch (error) {
      console.error("Ошибка при сохранении данных:", error);
    }
  };

  const onCancel = () => {
    if (user) {
      reset({
        fullName: user.fullName || "",
        name: user.name,
        country: user.country || "",
        language: user.language || LanguageEnum.russian,
        gender: user.gender || GenderEnum.male,
        email: user.email,
        password: "",
      });
    }
  };

  const Input = useMemo(() => createInputBase<IProfile>(), []);
  const InputEmail = useMemo(() => createInputEmail<IProfile>(), []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={style.form}>
          <InputForm
            text="Полное имя"
            className={style.inputWrapper}
            error={errors.fullName}
          >
            <Input
              register={register}
              name="fullName"
              className={style.input}
            />
          </InputForm>

          <InputForm text="Псевдоним" error={errors.name}>
            <Input register={register} name="name" className={style.input} />
          </InputForm>

          <InputForm text="Страна" error={errors.country}>
            <Input register={register} name="country" className={style.input} />
          </InputForm>

          <InputForm text="Язык" error={errors.language}>
            <Select<IProfile>
              register={register}
              name="language"
              options={Object.values(LanguageEnum)}
            />
          </InputForm>

          <InputForm text="Пол" error={errors.gender}>
            <Select<IProfile>
              register={register}
              name="gender"
              options={Object.values(GenderEnum)}
            />
          </InputForm>

          <InputForm text="Email" error={errors.email}>
            <InputEmail
              register={register}
              name="email"
              className={style.input}
            />
          </InputForm>

          <div>
            <InputPassword
              name={"password"}
              register={register}
              className={style.input}
            />
          </div>
        </div>

        {errorStore && (
          <SmallText className={style.error}>{errorStore}</SmallText>
        )}

        {isDirty && (
          <div className={style.options}>
            <Button type="button" onClick={onCancel} className={style.cancel}>
              Отмена
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={style.confirm}
            >
              {isSubmitting ? <Spinner /> : "Сохранить"}
            </Button>
          </div>
        )}
      </form>
    </>
  );
};

export default ProfileForm;
