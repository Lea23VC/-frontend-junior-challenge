import { todoState } from "ts/types/todo.types";

//create inital state constant
const todoInitalState: todoState = {
  todoList: [],
  count: 0,
  status: "idle",
  error: "",
  loaded: false,
};

//update count value
todoInitalState.count = todoInitalState.todoList.filter(
  (todo) => todo.checked
).length;

export { todoInitalState };
