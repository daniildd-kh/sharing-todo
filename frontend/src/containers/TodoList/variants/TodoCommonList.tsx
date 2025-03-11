import React, { useEffect } from "react";
import { fetchGetCommonTasks } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import TodoList from "../TodoList";

const TodoCommonList = () => {
  const {
    loading,
    commonTasks: reduxTasks,
    error,
  } = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchGetCommonTasks());
  }, [dispatch]);

  return (
    <>
      <TodoList
        reduxTasks={reduxTasks}
        loading={loading}
        error={error}
        title="Общие задачи"
      />
    </>
  );
};

export default TodoCommonList;
