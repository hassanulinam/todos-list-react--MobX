import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Todos List</h1>
      <TodoList />
      <AddTodo />
    </div>
  );
}

export default App;
