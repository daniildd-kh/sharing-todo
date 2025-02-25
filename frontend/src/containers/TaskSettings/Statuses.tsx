import IconSvg, { IconName } from "../../components/common/Icons/IconSvg";
import { Button } from "../../components/common/Button/Button";
import { SmallText } from "../../components/common/Typography/Typography";
import { StatusType } from "../../models";
import clsx from "clsx";
import style from "./TaskSettings.module.scss";

interface TaskStatusesProps {
  setStatus: (status: StatusType) => void;
  currentStatus?: StatusType;
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

const TaskStatuses = ({ setStatus, currentStatus }: TaskStatusesProps) => {
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
          {currentStatus && currentStatus === status.value && (
            <IconSvg name="checkmark" size={13} color="#f075aa" />
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskStatuses;
