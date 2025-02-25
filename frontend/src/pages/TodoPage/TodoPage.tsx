import React, { useEffect, useState } from "react";
import {
  LargeText,
  Text,
  Title,
} from "../../components/common/Typography/Typography";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchGetUserTasks } from "../../store/actions";
import { Modal } from "../../components/common/Modal/Modal";
import IconSvg from "../../components/common/Icons/IconSvg";
import style from "./TodoPage.module.scss";
import AddNewTaskForm from "../../components/common/AddNewTaskForm/AddNewTaskForm";
import { Button } from "../../components/common/Button/Button";
import TodoList from "../../containers/TodoList/TodoList";
import { ITask, StatusType } from "../../models";
import Spinner from "../../components/common/Loader/Spinner";
import Filter from "./components/Filter/Filter";

const TodoPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    loading,
    tasks: reduxTasks,
    error,
  } = useSelector((state: RootState) => state.todo);

  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    dispatch(fetchGetUserTasks());
  }, [dispatch]);

  useEffect(() => {
    if (reduxTasks) {
      setTasks([...reduxTasks].sort((a, b) => a.order - b.order));
    }
  }, [reduxTasks]);

  const [sortStatus, setSortStatus] = useState<StatusType>();

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

  return (
    <div>
      <span className={style.title}>
        <IconSvg name="inbox" size={36} />
        <Title>Входящие задачи</Title>
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
      </div>

      {loading && (
        <div className={style.centerContent}>
          <Spinner size={48} />
        </div>
      )}
      {error && (
        <div className={style.centerContent}>
          <LargeText style={{ color: "red" }}>{error}</LargeText>
        </div>
      )}
      {tasks?.length === 0 && (
        <div className={style.centerContent}>
          <LargeText>Пока нет задач, создайте новую!</LargeText>
        </div>
      )}
      {tasks && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <TodoList tasksList={tasks} />
        </div>
      )}
      <Modal isOpen={showModal} handleClose={() => setShowModal(false)}>
        <AddNewTaskForm onClose={() => setShowModal(false)} />
      </Modal>
    </div>
  );
};

export default TodoPage;
