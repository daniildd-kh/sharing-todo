import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { fetchGetUserTasks } from "../../../store/actions";
import TodoList from "../TodoList";

const TodoUserList = () => {
  const {
    loading,
    tasks: reduxTasks,
    error,
  } = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchGetUserTasks());
  }, [dispatch]);

  return (
    <>
      <TodoList
        reduxTasks={reduxTasks}
        loading={loading}
        error={error}
        title="Входящие задачи"
      />
    </>
  );
};

export default TodoUserList;
