import { todoState } from "redux/reducers/todoSlice";

//create inital state constant
const todoInitalState: todoState = {
  todoList: [
    {
      label: "Fix an ability to display all stacks",
      checked: true,
    },
    {
      label: "Fix a laylout. checkbox should be listed in a column",
      checked: true,
    },
    {
      label: "Fix an ability to add a new task",
      checked: true,
    },
    {
      label: "Fix an ability to toggle a task",
      checked: true,
    },
    {
      label: "Fix an ability to delete a task",
    },
    {
      label: "Fix an ability to count completed task",
    },
  ],
  count: 0,
};

//update count value
todoInitalState.count = todoInitalState.todoList.filter(
  (todo) => todo.checked
).length;

export { todoInitalState };
