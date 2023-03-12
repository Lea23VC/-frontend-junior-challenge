import { createSlice } from "@reduxjs/toolkit";
import { todoInitalState as initialState } from "constants/todoInitialState";

export type todoState = {
  todoList: todo[];
  count: number;
};

export type todo = {
  label: string;
  checked?: boolean;
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newArray = addTodoUtil(action.payload, state.todoList);
      updateState(state, newArray);
    },
    removeTodo: (state, action) => {
      const newArray = removeTodoUtil(action.payload, state.todoList);
      updateState(state, newArray);
    },
    updateTodo: (state, action) => {
      const newArray = updateTodoUtil(action.payload, state.todoList);
      updateState(state, newArray);
    },
  },
});
export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;

const removeTodoUtil = (index: number, todoList: todo[]) => {
  const newArray = [...todoList];
  newArray.splice(index, 1);
  return newArray;
};

const updateTodoUtil = (
  payload: { todo: todo; index: number },
  todoList: todo[]
) => {
  const { todo, index } = payload;
  const newArray = [...todoList];
  newArray[index] = todo;
  return newArray;
};

const addTodoUtil = (todo: todo, todoList: todo[]) => {
  const newArray = [...todoList];
  newArray.push(todo);
  return newArray;
};

function countDone(todoList: todo[]) {
  const doneList = todoList.filter((todo) => todo.checked === true);
  const length = doneList.length;
  return length;
}

function updateState(state: todoState, newArray: todo[]) {
  state.todoList = newArray;
  state.count = countDone(newArray);
}
