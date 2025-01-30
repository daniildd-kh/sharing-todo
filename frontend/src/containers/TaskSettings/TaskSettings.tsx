import { Button } from "../../components/common/Button/Button";
import IconSvg from "../../components/common/Icons/IconSvg";
import { SmallText } from "../../components/common/Typography/Typography";
import AccordionWithTrigger from "../../components/common/Accordion/AccordionWithTrigger";
import TaskStatuses from "./Statuses";
import style from "./TaskSettings.module.scss";
import clsx from "clsx";
import { StatusType } from "../../models";

interface TaskSettingsProps {
  isImportant?: boolean;
  handleIsImportant?: () => void;
  handleStatus?: (status: StatusType) => void;
  currentStatus: StatusType;
}

const TaskSettings = ({
  isImportant,
  handleIsImportant,
  handleStatus,
  currentStatus,
}: TaskSettingsProps) => {
  return (
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
          <Button className={clsx(style.button, style.trigger)} type="button">
            <IconSvg name="tags" size={13} />
            <SmallText>Статус</SmallText>
          </Button>
        }
      >
        {
          <TaskStatuses
            setStatus={handleStatus!}
            currentStatus={currentStatus}
          />
        }
      </AccordionWithTrigger>
    </div>
  );
};

export default TaskSettings;
