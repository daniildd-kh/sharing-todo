import style from "./AddNewTaskForm.module.scss";
import { createInput, createInputBase } from "../Input/Input";
import { ITask } from "../../../models";
import { Button } from "../Button/Button";
import { SmallText } from "../Typography/Typography";
import IconSvg, { IconName } from "../Icons/IconSvg";
import AccordionWithTrigger from "../Accordion/AccordionWithTrigger";
import clsx from "clsx";
import { StatusType } from "../../../models";
import { SubmitHandler, useForm } from "react-hook-form";
import { boolean, object, ObjectSchema, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import NewTaskStatuses from "./Statuses";

interface AddNewTaskFormProps {
  onClose?: () => void;
}
const taskSchema: ObjectSchema<ITask> = object({
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
    formState: { isValid },
  } = useForm<ITask>({
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
  const onSubmit: SubmitHandler<ITask> = (data) => console.log(data);

  const Input = createInput<ITask>();
  const InputBase = createInputBase<ITask>();

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

        <div className={style.setting}>
          <Button
            className={clsx(style.button, {
              [style.exclamation]: isImportant,
            })}
            onClick={handleIsImportant}
            type="button"
          >
            <IconSvg name="exclamation" size={13} />
            <SmallText>Приоритет</SmallText>
          </Button>
          <AccordionWithTrigger
            trigger={
              <Button
                className={clsx(style.button, style.trigger)}
                type="button"
              >
                <IconSvg name="tags" size={13} />
                <SmallText>Статус</SmallText>
              </Button>
            }
          >
            {
              <NewTaskStatuses
                setStatus={handleStatus}
                currentStatus={currentStatus}
              />
            }
          </AccordionWithTrigger>
        </div>
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
          {/*BUG: когда форма валидна, то происходит ререндер и сброс фокуса с поля*/}
          <Button className={style.addButton} type="submit" disabled={!isValid}>
            <SmallText>Добавить задачу</SmallText>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddNewTaskForm;
