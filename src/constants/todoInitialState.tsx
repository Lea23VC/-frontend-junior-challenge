import { todoState } from "redux/reducers/todoSlice";

//create inital state constant
const todoInitalState: todoState = {
  todoList: [],
  count: 0,
  status: "idle",
  error: "",
};

//update count value
todoInitalState.count = todoInitalState.todoList.filter(
  (todo) => todo.checked
).length;

export { todoInitalState };
