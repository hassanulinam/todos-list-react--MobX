import { makeAutoObservable, runInAction } from "mobx";

// ========================================================

export class Todo {
  done = false;

  constructor(public id: number, public text: string) {
    makeAutoObservable(this);
  }

  set changeDoneStatus(value: boolean) {
    this.done = value;
  }
}

// ======================================================

export const filterConst = {
  completed: "completed",
  pending: "pending",
  all: "all",
};

// ======================================================

class Store {
  todos: Todo[] = [];
  newTodo = "";
  n = 0;
  activeFilter = filterConst.all;
  loadedSampleData = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  set changeFilter(value: string) {
    this.activeFilter = value;
  }

  addTodo() {
    if (this.newTodo.trim() !== "")
      this.todos.push(new Todo(++this.n, this.newTodo));
    this.newTodo = "";
  }

  removeTodo(id: number | string) {
    this.todos = this.todos.filter((t) => t.id !== id);
  }

  *load(url: string) {
    if (!this.loadedSampleData)
      yield fetch(url)
        .then((res) => res.json())
        .then((data) =>
          runInAction(() => {
            this.todos.push(
              ...data.map((t: Todo) => new Todo(++this.n, t.text))
            );
            this.n = this.todos.length;
          })
        );
    this.loadedSampleData = true;
  }

  clearTodos() {
    this.todos = [];
    this.n = 0;
    this.loadedSampleData = false;
  }

  get filteredTodoList() {
    if (this.activeFilter === filterConst.completed)
      return this.todos.filter((t) => t.done);
    if (this.activeFilter === filterConst.pending)
      return this.todos.filter((t) => !t.done);
    return this.todos;
  }
}

const store = new Store();

export default store;
