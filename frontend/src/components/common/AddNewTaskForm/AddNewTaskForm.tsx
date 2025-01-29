import React, { ChangeEvent, useState } from "react";
import style from "./AddNewTaskForm.module.scss";
import { Input, InputBase } from "../Input/Input";
import { ITask } from "../../../models";
import { Button } from "../Button/Button";
import { SmallText, Text } from "../Typography/Typography";
import IconSvg, { IconName } from "../Icons/IconSvg";
import AccordionWithTrigger from "../Accordion/AccordionWithTrigger";
import clsx from "clsx";
import { StatusType } from "../../../models";

interface NewTaskStatusesProps {
  setStatus: (status: StatusType) => void;
  currentStatus: StatusType;
}
interface IStatus {
  label: string;
  value: StatusType;
  icon: IconName;
}

const statuses: IStatus[] = [
  {
    label: "Без статуса",
    value: "unfinished",
    icon: "close",
  },
  {
    label: "В работе",
    value: "inProgress",
    icon: "progress",
  },
  {
    label: "На рассмотрение",
    value: "waitingForApproval",
    icon: "checkmark",
  },
  {
    label: "Готово",
    value: "completed",
    icon: "checkmark",
  },
];

const NewTaskStatuses = ({
  setStatus,
  currentStatus,
}: NewTaskStatusesProps) => {
  return (
    <div className={style.statuses}>
      {statuses.map((status, index) => (
        <div className={style.status} key={index}>
          <Button
            className={clsx(
              style.button,
              style.accordionItem,
              style[status.value]
            )}
            onClick={() => setStatus(status.value)}
          >
            <IconSvg name={status.icon} size={13} />
            <SmallText>{status.label}</SmallText>
          </Button>
          {currentStatus === status.value && (
            <IconSvg name="checkmark" size={13} color="#f075aa" />
          )}
        </div>
      ))}
    </div>
  );
};
interface AddNewTaskFormProps {
  onClose?: () => void;
}

const AddNewTaskForm = ({ onClose }: AddNewTaskFormProps) => {
  const [newTask, setNewTask] = useState<ITask>({
    title: "",
    description: "",
    status: "unfinished",
    isImportant: false,
  });
  // TODO: добавить нормальную валидацию

  const isFormValid =
    newTask.title.trim() !== "" && newTask.description.trim() !== "";

  const handleStatus = (status: StatusType) => {
    setNewTask((prevData) => ({ ...prevData, status }));
  };
  const handleIsImportant = () => {
    setNewTask((prevData) => ({
      ...prevData,
      isImportant: !newTask.isImportant,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("sent");
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTask((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <div className={style.content}>
        <Input
          placeholder="Заголовок задачи"
          name="title"
          value={newTask.title}
          onChange={handleChange}
          className={style.title}
        />
        <InputBase
          placeholder="Описание"
          name="description"
          value={newTask.description}
          onChange={handleChange}
          className={style.description}
        />
        <div className={style.setting}>
          <Button
            className={clsx(style.button, {
              [style.exclamation]: newTask.isImportant,
            })}
            onClick={handleIsImportant}
          >
            <IconSvg name="exclamation" size={13} />
            <SmallText>Приоритет</SmallText>
          </Button>
          <AccordionWithTrigger
            trigger={
              <Button className={clsx(style.button, style.trigger)}>
                <IconSvg name="tags" size={13} />
                <SmallText>Статус</SmallText>
              </Button>
            }
          >
            {
              <NewTaskStatuses
                setStatus={handleStatus}
                currentStatus={newTask.status}
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
          <Button className={style.cancel} onClick={onClose}>
            <SmallText>Отмена</SmallText>
          </Button>
          <Button
            className={style.addButton}
            type="submit"
            disabled={!isFormValid}
          >
            <SmallText>Добавить задачу</SmallText>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddNewTaskForm;
