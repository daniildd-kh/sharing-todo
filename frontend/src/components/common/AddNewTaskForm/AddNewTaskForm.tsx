import { createInput, createInputBase } from "../Input/Input";
import { ITask } from "../../../models";
import { Button } from "../Button/Button";
import { SmallText } from "../Typography/Typography";
import IconSvg from "../Icons/IconSvg";
import { StatusType } from "../../../models";
import { SubmitHandler, useForm } from "react-hook-form";
import { boolean, object, ObjectSchema, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TaskSettings from "../../../containers/TaskSettings/TaskSettings";
import style from "./AddNewTaskForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { fetchAddUserTask } from "../../../store/actions";
import { useEffect } from "react";

interface AddNewTaskFormProps {
  onClose?: () => void;
}
type INewTask = Omit<ITask, "_id">;

const taskSchema: ObjectSchema<INewTask> = object({
  title: string().required(),
  description: string().required(),
  status: string<StatusType>().required(),
  isImportant: boolean().required(),
  owner: string().optional(),
});

const AddNewTaskForm = ({ onClose }: AddNewTaskFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isValid, isSubmitSuccessful },
  } = useForm<INewTask>({
    mode: "onSubmit",
    defaultValues: {
      title: "",
      description: "",
      status: "unfinished",
      isImportant: false,
    },
    resolver: yupResolver(taskSchema),
  });

  const currentStatus = watch("status");
  const isImportant = watch("isImportant");
  const ownerId = useSelector((state: RootState) => state.auth.user?._id);
  const dispatch = useDispatch<AppDispatch>();
  const onSubmit: SubmitHandler<INewTask> = (data) => {
    if (!ownerId) return;
    dispatch(fetchAddUserTask({ ...data, owner: ownerId }));
    if (onClose) onClose();
  };

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  const Input = createInput<INewTask>();
  const InputBase = createInputBase<INewTask>();

  const handleStatus = (status: StatusType) => {
    setValue("status", status);
  };

  const handleIsImportant = () => {
    setValue("isImportant", !isImportant);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <div className={style.content}>
        <Input
          placeholder="Заголовок задачи"
          register={register}
          name="title"
          className={style.title}
        />
        <InputBase
          placeholder="Описание"
          name="description"
          register={register}
          className={style.description}
        />
        <TaskSettings
          isImportant={isImportant}
          handleIsImportant={handleIsImportant}
          handleStatus={handleStatus}
          currentStatus={currentStatus}
        />
      </div>
      <div className={style.divider}></div>
      <div className={style.bottom}>
        <div className={style.inbox}>
          <IconSvg name="inbox" size={13} />
          <SmallText className={style.bold}>Входящие</SmallText>
        </div>
        <div className={style.actions}>
          <Button className={style.cancel} onClick={onClose} type="button">
            <SmallText>Отмена</SmallText>
          </Button>
          <Button className={style.addButton} type="submit" disabled={!isValid}>
            <SmallText>Добавить задачу</SmallText>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddNewTaskForm;
