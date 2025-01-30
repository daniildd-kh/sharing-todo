import clsx from "clsx";
import { LargeText, SmallText } from "../Typography/Typography";
import IconSvg, { IconName } from "../Icons/IconSvg";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Textarea from "../Textarea/Textarea";
import { createInput } from "../Input/Input";
import AccordionWithTrigger from "../Accordion/AccordionWithTrigger";
import TaskSettings from "../../../containers/TaskSettings/TaskSettings";
import { ITask, StatusType } from "../../../models";
import { Button } from "../Button/Button";
import style from "./Task.module.scss";

type statusVariant =
  | "unfinished"
  | "inProgress"
  | "waitingForApproval"
  | "completed";
const statusIcon: Record<statusVariant, IconName> = {
  unfinished: "close",
  inProgress: "progress",
  completed: "checkmark",
  waitingForApproval: "checkmark",
};

interface TaskProps {
  status?: statusVariant;
  isImportant?: boolean;
  title?: string;
  description?: string;
}

function withTask(defaults: TaskProps) {
  const Input = createInput();
  return function Task({
    status = defaults.status || "unfinished",
    isImportant = defaults.isImportant || false,
    title = "No title",
    description = "No description",
  }: TaskProps) {
    const taskRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isChange, setIsChange] = useState(false);
    const [taskData, setTaskData] = useState<ITask>({
      title,
      description,
      isImportant,
      status,
    });
    const originalTaskData = useRef<ITask>({ ...taskData });

    const handleSave = () => {
      originalTaskData.current = { ...taskData };
      setIsChange(false);
      console.log(taskData);
    };

    const handleCancel = () => {
      setTaskData({ ...originalTaskData.current });
      setIsChange(false);
    };

    const toggleOpen = () => {
      setIsOpen(!isOpen);
    };

    const toggleChange = () => {
      setIsChange(!isChange);
      setIsOpen(true);
    };

    const changeTask = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setTaskData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const changeTaskisImportant = () => {
      setIsChange(true);
      setTaskData((prevData) => ({
        ...prevData,
        isImportant: !taskData.isImportant,
      }));
    };

    const changeTaskStatus = (status: StatusType) => {
      setIsChange(true);
      setTaskData((prevData) => ({
        ...prevData,
        status: status,
      }));
    };

    let delayTimer: ReturnType<typeof setTimeout>;

    const handleDblClickTitle = (e: React.MouseEvent<HTMLInputElement>) => {
      clearTimeout(delayTimer);
      e.stopPropagation();
      setIsChange(true);
      setIsOpen(true);
    };

    const handleSingleClick = (e: React.MouseEvent) => {
      clearTimeout(delayTimer);
      delayTimer = setTimeout(() => setIsOpen(!isOpen), 200);
      e.stopPropagation();
    };

    const handleOutsideClick = (e: MouseEvent) => {
      if (
        taskRef.current &&
        !taskRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest("input")
      ) {
        setIsChange(false);
        setIsOpen(false);
      }
    };

    useEffect(() => {
      document.addEventListener("mousedown", handleOutsideClick);
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }, []);

    return (
      <div
        className={clsx(style.todo, style[status], { [style.open]: isOpen })}
        ref={taskRef}
      >
        <div className={clsx(style.header, style.pointer)} onClick={toggleOpen}>
          <span className={clsx(style.iconStatus, style[status])}>
            <IconSvg name={status ? statusIcon[status] : "close"} size={18} />
          </span>
          <div
            className={style.contentMenu}
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              className={clsx(style.pointer, style.icon)}
              onClick={toggleChange}
            >
              {!isChange ? (
                <IconSvg name={"pencil"} />
              ) : (
                <IconSvg name={"checkmark"} />
              )}
            </Button>
            <Button className={clsx(style.pointer, style.trash)}>
              <IconSvg name={"trash"}></IconSvg>
            </Button>
            <AccordionWithTrigger
              trigger={
                <Button
                  className={clsx(style.pointer, style.icon)}
                  onClick={() => setIsOpen(true)}
                >
                  <IconSvg name={"dots"}></IconSvg>
                </Button>
              }
            >
              {
                <TaskSettings
                  handleIsImportant={changeTaskisImportant}
                  handleStatus={changeTaskStatus}
                  currentStatus={taskData.status}
                  isImportant={taskData.isImportant}
                />
              }
            </AccordionWithTrigger>
          </div>
          {!isChange ? (
            <LargeText
              className={clsx(style.title, style[status])}
              onClick={handleSingleClick}
              onDoubleClick={handleDblClickTitle}
            >
              {taskData.title}
            </LargeText>
          ) : (
            <Input
              className={style.title}
              value={taskData.title}
              name="title"
              onChange={changeTask}
              onClick={(e) => e.stopPropagation()}
              register={undefined}
            />
          )}
          {isImportant && (
            <span className={clsx(style.iconStatus, style.exclamation)}>
              <IconSvg name={"exclamation"} />
            </span>
          )}
        </div>
        <div className={style.content}>
          <div className={style.divider}></div>
          {!isChange ? (
            <p>{taskData.description}</p>
          ) : (
            <Textarea
              name="description"
              value={taskData.description}
              onChange={changeTask}
            />
          )}
          {isChange && (
            <div className={style.action}>
              <Button
                className={clsx(style.cancel)}
                onClick={handleCancel}
                type="button"
              >
                <SmallText>Отменить</SmallText>
              </Button>
              <Button
                className={style.buttonChange}
                onClick={handleSave}
                type="button"
              >
                <SmallText>Сохранить</SmallText>
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };
}

export const Task = withTask({});
