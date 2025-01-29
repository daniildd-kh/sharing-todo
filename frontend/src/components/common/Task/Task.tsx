import style from "./Task.module.scss";
import IconSvg, { IconName } from "../Icons/IconSvg";
import { LargeText } from "../Typography/Typography";
import clsx from "clsx";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Textarea from "../Textarea/Textarea";
import { createInput } from "../Input/Input";

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
  isWarning?: boolean;
  title?: string;
  description?: string;
}

function withTask(defaults: TaskProps) {
  const Input = createInput();
  return function Task({
    status = defaults.status || "unfinished",
    isWarning = defaults.isWarning || false,
    title = "No title",
    description = "No description",
  }: TaskProps) {
    const taskRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isChange, setIsChange] = useState(false);
    const [taskData, setTaskData] = useState({
      title,
      description,
    });
    const toggleOpen = () => {
      setIsOpen(!isOpen);
    };

    const toggleChange = () => {
      setIsChange(!isChange);
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
            <IconSvg name={status ? statusIcon[status] : "close"} />
          </span>
          {!isChange ? (
            <div
              onClick={handleSingleClick}
              onDoubleClick={handleDblClickTitle}
            >
              <LargeText className={clsx(style.text, style[status])}>
                {taskData.title}
              </LargeText>
            </div>
          ) : (
            <Input
              value={taskData.title}
              name="title"
              onChange={changeTask}
              onClick={(e) => e.stopPropagation()}
              register={undefined}
              onBlur={() => {
                console.log("blur");
              }}
            />
          )}
          {isWarning && (
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
          <div className={style.contentMenu}>
            <a
              className={clsx(style.pointer, style.pencil)}
              onClick={toggleChange}
            >
              {!isChange ? (
                <IconSvg name={"pencil"} />
              ) : (
                <a className={clsx(style.pointer)} onClick={toggleChange}>
                  <IconSvg name={"checkmark"} />
                </a>
              )}
            </a>
            <a className={clsx(style.pointer, style.trash)}>
              <IconSvg name={"trash"}></IconSvg>
            </a>
          </div>
        </div>
      </div>
    );
  };
}

export const Task = withTask({});
