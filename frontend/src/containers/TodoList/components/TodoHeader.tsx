import React, { useEffect, useState } from "react";
import IconSvg from "../../../components/common/Icons/IconSvg";
import { Title, Text } from "../../../components/common/Typography/Typography";
import { Button } from "../../../components/common/Button/Button";
import style from "./TodoHeader.module.scss";
import Filter from "../../../pages/TodoPage/components/Filter/Filter";
import Search from "../../../pages/TodoPage/components/Search/Search";
import { ITask, StatusType } from "../../../models";
import { Modal } from "../../../components/common/Modal/Modal";
import AddNewTaskForm from "../../../components/common/AddNewTaskForm/AddNewTaskForm";

interface TodoHeaderProps {
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
  originTasks: React.RefObject<ITask[]>;
  title: string;
}

const TodoHeader = ({ setTasks, originTasks, title }: TodoHeaderProps) => {
  const [sortStatus, setSortStatus] = useState<StatusType>();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const sortByStatus = (statusName: StatusType) => {
      setTasks((prevTasks) =>
        [...prevTasks].sort(
          (a: ITask, b: ITask) =>
            (b.status === statusName ? 1 : 0) -
            (a.status === statusName ? 1 : 0)
        )
      );
    };
    if (sortStatus) {
      sortByStatus(sortStatus);
    }
  }, [sortStatus]);

  const sortByPriority = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setTasks((prevTasks) =>
      [...prevTasks].sort((a: ITask, b: ITask) => {
        if (isChecked) {
          return (b.isImportant ? 1 : 0) - (a.isImportant ? 1 : 0);
        } else {
          return a.order - b.order;
        }
      })
    );
  };

  const handleSearch = (query: string) => {
    setTasks(
      [...originTasks.current].filter(
        (task) =>
          task.description.toLowerCase().includes(query) ||
          task.title.toLowerCase().includes(query)
      )
    );
  };

  return (
    <>
      <span className={style.title}>
        <IconSvg name="inbox" size={36} />
        <Title>{title}</Title>
      </span>
      <div className={style.options}>
        <Button onClick={() => setShowModal(true)} className={style.buttonTodo}>
          <IconSvg name="add" />
          <Text>Добавить задачу</Text>
        </Button>
        <Filter
          classButton={style.buttonTodo}
          setSortStatus={setSortStatus}
          sortStatus={sortStatus}
          sortByPriority={sortByPriority}
        />
        <Search onSearch={handleSearch} />
      </div>
      <Modal isOpen={showModal} handleClose={() => setShowModal(false)}>
        <AddNewTaskForm onClose={() => setShowModal(false)} />
      </Modal>
    </>
  );
};

export default TodoHeader;
