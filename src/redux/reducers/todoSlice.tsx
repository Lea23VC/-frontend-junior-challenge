import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "config/api";
import { todoInitalState as initialState } from "constants/todoInitialState";

export type todoState = {
  todoList: todo[];
  count: number;
  status: string;
  error: string;
};

export type todo = {
  label: string;
  checked?: boolean;
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get<todo[]>(API_URL);
  console.log(response.data);
  return response?.data;
});

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
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todoList = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;

export const selectAllTodos = (state: todoState) => state.todoList;
export const getTodosError = (state: todoState) => state.error;
export const getTodosStatus = (state: todoState) => state.status;

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
