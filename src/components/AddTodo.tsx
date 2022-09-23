import { runInAction } from "mobx";
import { observer } from "mobx-react";
import store from "../store";

const todosDataUrl =
  "https://raw.githubusercontent.com/jherr/todos-four-ways/master/data/todos.json";

const AddTodo = () => {
  return (
    <>
      <div className="add-todo-container">
        <input
          type="text"
          placeholder="New Todo"
          className="add-todo-input"
          value={store.newTodo}
          onChange={(e) => runInAction(() => (store.newTodo = e.target.value))}
        />
        <button
          type="button"
          onClick={() => store.addTodo()}
          className="add-btn"
        >
          Add
        </button>
      </div>
      <button
        type="button"
        className="load-btn"
        onClick={() => store.load(todosDataUrl)}
      >
        Load / Reset
      </button>
    </>
  );
};

export default observer(AddTodo);
