import React, { useState, useEffect } from "react";
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
import SortableTask from "./SortableTask";
import TodoService from "../../services/TodoService";

interface TodoListProps {
  tasksList: ITask[];
}

const TodoList = ({ tasksList }: TodoListProps) => {
  const [tasks, setTasks] = useState(tasksList);

  useEffect(() => {
    setTasks(tasksList);
  }, [tasksList]);

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
  );
};

export default TodoList;
