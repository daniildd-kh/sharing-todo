import clsx from "clsx";
import { LargeText, SmallText } from "../Typography/Typography";
import IconSvg, { IconName } from "../Icons/IconSvg";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import Textarea from "../Textarea/Textarea";
import { CommonInput, createInput } from "../Input/Input";
import AccordionWithTrigger from "../Accordion/AccordionWithTrigger";
import TaskSettings from "../../../containers/TaskSettings/TaskSettings";
import { ITask, StatusType } from "../../../models";
import { Button } from "../Button/Button";
import style from "./Task.module.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import {
  fetchRemoveUserTask,
  fetchUpdateUserTask,
} from "../../../store/actions";

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

export type ITaskCard = Omit<ITask, "order">;

interface TaskProps {
  _id?: string;
  status?: statusVariant;
  isImportant?: boolean;
  title?: string;
  common?: boolean;
  description?: string;
  author?: string | null;
}

function withTask(defaults: TaskProps) {
  return function Task({
    _id = defaults._id || "",
    status = defaults.status || "unfinished",
    isImportant = defaults.isImportant || false,
    title = "No title",
    author = null,
    description = "No description",
    common = defaults.common || false,
  }: TaskProps) {
    const taskRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isChange, setIsChange] = useState(false);
    const [taskData, setTaskData] = useState<ITaskCard>({
      _id,
      title,
      description,
      isImportant,
      status,
      common,
    });
    const originalTaskData = useRef<ITaskCard>({ ...taskData });
    const dispatch = useDispatch<AppDispatch>();

    const handleSave = () => {
      dispatch(fetchUpdateUserTask(taskData));
      originalTaskData.current = { ...taskData };
      setIsChange(false);
    };

    const handleRemove = () => {
      dispatch(fetchRemoveUserTask(taskData));
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

    const changeTask = useCallback(
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTaskData((prev) => ({ ...prev, [name]: value }));
        setIsChange(true);
      },
      []
    );

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
        className={clsx(style.todo, style[taskData.status], {
          [style.open]: isOpen,
        })}
        ref={taskRef}
      >
        <div className={clsx(style.header, style.pointer)} onClick={toggleOpen}>
          <span className={clsx(style.iconStatus, style[taskData.status])}>
            <IconSvg
              name={status ? statusIcon[taskData.status] : "close"}
              size={18}
            />
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
            <Button
              className={clsx(style.pointer, style.trash)}
              onClick={handleRemove}
            >
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
              className={clsx(style.title, style[taskData.status])}
              onClick={handleSingleClick}
              onDoubleClick={handleDblClickTitle}
            >
              {taskData.title}
            </LargeText>
          ) : (
            <CommonInput
              className={style.title}
              value={taskData.title}
              name="title"
              onChange={changeTask}
              onClick={(e) => e.stopPropagation()}
            />
          )}
          {taskData.isImportant && (
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
          {author && (
            <div className={style.author}>
              <span className={style.authorText}>
                <SmallText>Автор:&nbsp;</SmallText>{" "}
                <SmallText className={style.smallBold}>{author}</SmallText>
              </span>
            </div>
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
