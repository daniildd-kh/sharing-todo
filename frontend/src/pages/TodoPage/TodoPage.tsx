import React, { useEffect, useState } from "react";
import { Text, Title } from "../../components/common/Typography/Typography";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchGetUserTasks } from "../../store/actions";
import { Task } from "../../components/common/Task/Task";
import { Modal, ModalWithTrigger } from "../../components/common/Modal/Modal";
import IconSvg from "../../components/common/Icons/IconSvg";
import style from "./TodoPage.module.scss";
import AddNewTaskForm from "../../components/common/AddNewTaskForm/AddNewTaskForm";
import { Button } from "../../components/common/Button/Button";

const TodoPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, tasks, error } = useSelector(
    (state: RootState) => state.todo
  );

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchGetUserTasks());
    console.log(tasks);
  }, [dispatch]);
  return (
    <div>
      <span className={style.title}>
        <IconSvg name="inbox" size={36} />
        <Title>Входящие задачи</Title>
      </span>
      <Button
        onClick={() => setShowModal(true)}
        className={style.addNewTaskButton}
      >
        <IconSvg name="add" />
        <Text>Добавить задачу</Text>
      </Button>
      <Modal isOpen={showModal} handleClose={() => setShowModal(false)}>
        <AddNewTaskForm onClose={() => setShowModal(false)} />
      </Modal>

      {loading && <p>Loading...</p>}
      {tasks && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {tasks.map((task) => {
            return (
              <Task
                key={task._id}
                _id={task._id}
                status={task.status}
                isImportant={task.isImportant}
                title={task.title}
                description={task.description}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TodoPage;
