import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import store from "../store";

const TodoItemsList = () => {
  return (
    <div className="todo-items-list-container">
      {store.filteredTodoList.map((todo) => (
        <div key={todo.id} className="todo-item">
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
        </div>
      ))}
    </div>
  );
};

export default observer(TodoItemsList);
