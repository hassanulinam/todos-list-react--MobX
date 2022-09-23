import { makeAutoObservable, runInAction } from "mobx";

export interface Todo {
  id: string | number;
  text: string;
  done: boolean;
}

const addTodo = (todos: Todo[], text: string, id: number | string): Todo[] => [
  { id, text, done: false },
  ...todos,
];

const removeTodo = (todos: Todo[], id: number | string): Todo[] =>
  todos.filter((todo: Todo) => todo.id !== id);

class Store {
  todos: Todo[] = [];
  newTodo = "";
  n = 0;

  constructor() {
    makeAutoObservable(this);
  }

  addTodo() {
    this.todos = addTodo(this.todos, this.newTodo, ++this.n);
    this.newTodo = "";
  }

  removeTodo(id: number | string) {
    this.todos = removeTodo(this.todos, id);
  }

  load(url: string) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        runInAction(() => {
          this.todos = data;
          this.n = this.todos.length;
        });
      });
  }
}

const store = new Store();

export default store;
