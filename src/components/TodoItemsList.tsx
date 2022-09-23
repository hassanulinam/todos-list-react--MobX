import { observer } from "mobx-react-lite";
import store from "../store";
import TodoItem from "./TodoItem";

const TodoItemsList = () => {
  return (
    <ul className="todo-items-list-container">
      {store.filteredTodoList.map((t) => (
        <TodoItem key={t.id} todo={t} />
      ))}
    </ul>
  );
};

export default observer(TodoItemsList);
