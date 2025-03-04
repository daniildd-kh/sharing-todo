import React, { useState, useEffect, useRef } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  DragEndEvent,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Task } from "../../components/common/Task/Task";
import { ITask } from "../../models";
import SortableTask from "./components/SortableTask";
import TodoService from "../../services/TodoService";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchGetUserTasks } from "../../store/actions";
import { LargeText } from "../../components/common/Typography/Typography";
import Spinner from "../../components/common/Loader/Spinner";
import style from "./TodoList.module.scss";
import TodoHeader from "./components/TodoHeader";

const TodoList = () => {
  const {
    loading,
    tasks: reduxTasks,
    error,
  } = useSelector((state: RootState) => state.todo);
  const originTasks = useRef<ITask[]>([]);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   setTasks(tasksList);
  // }, [tasksList]);

  useEffect(() => {
    dispatch(fetchGetUserTasks());
  }, [dispatch]);

  useEffect(() => {
    if (reduxTasks) {
      const sortedTasks = [...reduxTasks].sort((a, b) => a.order - b.order);
      setTasks(sortedTasks);
      originTasks.current = sortedTasks;
    }
  }, [reduxTasks]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setTasks((prevTasks: ITask[]) => {
        const oldIndex = prevTasks.findIndex(
          (task: ITask) => task._id === active.id
        );
        const newIndex = prevTasks.findIndex(
          (task: ITask) => task._id === over.id
        );
        const reorderedTasks = arrayMove<ITask>(prevTasks, oldIndex, newIndex);
        const updatedTasks: ITask[] = reorderedTasks.map((task, index) => ({
          ...task,
          order: index,
        }));
        TodoService.reorderTasks(updatedTasks);
        return updatedTasks;
      });
    }
  };

  return (
    <>
      <TodoHeader setTasks={setTasks} originTasks={originTasks} />
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
        <div className={style.list}>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={tasks.map((task) => ({ id: task._id }))}
              strategy={verticalListSortingStrategy}
            >
              {tasks.map((task) => {
                return (
                  <SortableTask id={task._id} key={task._id}>
                    <Task
                      _id={task._id}
                      status={task.status}
                      isImportant={task.isImportant}
                      title={task.title}
                      description={task.description}
                    />
                  </SortableTask>
                );
              })}
            </SortableContext>
          </DndContext>
        </div>
      )}
    </>
  );
};

export default TodoList;
