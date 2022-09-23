import { observer } from "mobx-react-lite";
import store, { filterConst } from "../store";
import TodoItemsList from "./TodoItemsList";

const TodoList = () => {
  const currFilter = store.activeFilter;

  return (
    <div className="todo-list-container">
      {store.todos.length === 0 ? (
        <div className="no-todos-container">
          <p>No todos added.</p>
        </div>
      ) : (
        <>
          <div className="d-flex sticky-bar">
            <button
              type="button"
              onClick={() => (store.changeFilter = filterConst.completed)}
              className={`filter-btn ${
                currFilter === filterConst.completed && "active-filter-btn"
              }`}
            >
              Completed
            </button>
            <button
              type="button"
              onClick={() => (store.changeFilter = filterConst.pending)}
              className={`filter-btn ${
                currFilter === filterConst.pending && "active-filter-btn"
              }`}
            >
              Todo
            </button>
            <button
              type="button"
              onClick={() => (store.changeFilter = filterConst.all)}
              className={`filter-btn ${
                currFilter === filterConst.all && "active-filter-btn"
              }`}
            >
              All
            </button>
          </div>
          <TodoItemsList />
        </>
      )}
    </div>
  );
};

export default observer(TodoList);
