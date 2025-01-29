import IconSvg, { IconName } from "../Icons/IconSvg";
import { Button } from "../Button/Button";
import { SmallText } from "../Typography/Typography";
import { StatusType } from "../../../models";
import clsx from "clsx";
import style from "./AddNewTaskForm.module.scss";

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
            type="button"
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

export default NewTaskStatuses;
