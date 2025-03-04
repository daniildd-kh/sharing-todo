import { ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "./SortableTask.module.scss";

interface SortableTaskProps {
  children: ReactNode;
  id: string;
}

const SortableTask = ({ children, id, ...props }: SortableTaskProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...props}
      className={styles.sortableTask}
    >
      <div
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
        className={styles.handle}
      >
        ⠿
      </div>
      {children}
    </div>
  );
};

export default SortableTask;
