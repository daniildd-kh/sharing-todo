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
import { LargeText } from "../../components/common/Typography/Typography";
import Spinner from "../../components/common/Loader/Spinner";
import style from "./TodoList.module.scss";
import TodoHeader from "./components/TodoHeader";

interface TodoListProps {
  loading?: boolean;
  error?: string | null;
  reduxTasks: ITask[] | null;
  title: string;
}

const TodoList = ({ loading, error, reduxTasks, title }: TodoListProps) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const originTasks = useRef<ITask[]>([]);

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
      <TodoHeader setTasks={setTasks} originTasks={originTasks} title={title} />
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
                      common={task.common}
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
