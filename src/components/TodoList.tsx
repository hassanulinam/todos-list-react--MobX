import { autorun, runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import store, { Todo } from "../store";

const TodoList = () => {
  const [flag, setFlag] = useState(0);

  useEffect(() => {
    console.log("[useEffect]: detected change in todos[]");
    autorun(() => {
      setFlag((f) => f + 1);
      console.log("[autorun]", { ...store.todos.map((t) => ({ ...t })) });
    });
  }, []);

  return (
    <div>
      Flag: {flag}
      {store.todos.map((todo: Todo) => (
        <div key={todo.id} className="todo-item">
          <div style={{ display: "flex", gap: 8 }}>
            <input
              type="checkbox"
              style={{ width: 20, height: 20 }}
              onClick={() => runInAction(() => (todo.done = !todo.done))}
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
        </div>
      ))}
    </div>
  );
};

export default observer(TodoList);
