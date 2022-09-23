import { runInAction } from "mobx";
import { observer } from "mobx-react";
import store, { Todo } from "../store";

const TodoItem = ({ todo }: { todo: Todo }) => {
  return (
    <li className="todo-item">
      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="checkbox"
          style={{ width: 20, height: 20 }}
          onChange={() =>
            runInAction(() => (todo.changeDoneStatus = !todo.done))
          }
          checked={todo.done}
        />

        <p style={{ wordBreak: "break-all" }}>{todo.text}</p>
      </div>
      <button
        type="button"
        className="del-btn"
        onClick={() => store.removeTodo(todo.id)}
      >
        delete
      </button>
    </li>
  );
};

export default observer(TodoItem);
