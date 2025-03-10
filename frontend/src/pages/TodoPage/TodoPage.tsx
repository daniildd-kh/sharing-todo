import TodoList from "../../containers/TodoList/TodoList";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const TodoPage = () => {
  const {
    loading,
    tasks: reduxTasks,
    error,
  } = useSelector((state: RootState) => state.todo);

  return (
    <div>
      <TodoList reduxTasks={reduxTasks} loading={loading} error={error} />
    </div>
  );
};

export default TodoPage;
