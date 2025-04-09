import { useEffect, useState } from "react";
import TodoCommonList from "../../containers/TodoList/variants/TodoCommonList";
import TodoUserList from "../../containers/TodoList/variants/TodoUserList";
import Switch, { TodoSection } from "./components/Switch/Switch";

interface TodoPageProps {
  activePage: TodoSection;
}

const TodoPage = ({ activePage }: TodoPageProps) => {
  const [activeTab, setActiveTab] = useState(activePage);

  useEffect(() => {
    setActiveTab(activePage);
  }, [activePage]);

  return (
    <div>
      <Switch activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "user" ? <TodoUserList /> : <TodoCommonList />}
    </div>
  );
};

export default TodoPage;
