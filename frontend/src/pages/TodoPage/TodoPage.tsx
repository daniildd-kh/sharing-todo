import { useState } from "react";
import TodoCommonList from "../../containers/TodoList/variants/TodoCommonList";
import TodoUserList from "../../containers/TodoList/variants/TodoUserList";
import Switch from "./components/Switch/Switch";

const TodoPage = () => {
  const [activeTab, setActiveTab] = useState("user");

  return (
    <div>
      <Switch activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "user" ? <TodoUserList /> : <TodoCommonList />}
    </div>
  );
};

export default TodoPage;
