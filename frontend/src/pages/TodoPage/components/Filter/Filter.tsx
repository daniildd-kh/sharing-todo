import React, { Dispatch, SetStateAction } from "react";
import AccordionWithTrigger from "../../../../components/common/Accordion/AccordionWithTrigger";
import { Button } from "../../../../components/common/Button/Button";
import IconSvg from "../../../../components/common/Icons/IconSvg";
import { Text } from "../../../../components/common/Typography/Typography";
import clsx from "clsx";
import { StatusType } from "../../../../models";
import TaskStatuses from "../../../../containers/TaskSettings/Statuses";
import style from "./Filter.module.scss";

interface FilterProps {
  classButton: string;
  sortStatus: StatusType | undefined;
  setSortStatus: Dispatch<SetStateAction<StatusType | undefined>>;
  sortByPriority: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Filter = ({
  classButton,
  sortByPriority,
  setSortStatus,
  sortStatus,
}: FilterProps) => {
  return (
    <AccordionWithTrigger
      trigger={
        <Button className={clsx(classButton, style.filter)}>
          <IconSvg name="filter" />
          <Text>Фильтр</Text>
        </Button>
      }
    >
      <ul className={style.filterMenu}>
        <li className={style.filterItem}>
          <Text>По приоритету</Text>
          <input type="checkbox" onChange={sortByPriority} />
        </li>
        <li className={style.filterItem}>
          <Text>По статусу</Text>
          <AccordionWithTrigger trigger={<IconSvg name="angle" />}>
            <TaskStatuses
              setStatus={setSortStatus}
              currentStatus={sortStatus}
            />
          </AccordionWithTrigger>
        </li>
      </ul>
    </AccordionWithTrigger>
  );
};

export default Filter;
