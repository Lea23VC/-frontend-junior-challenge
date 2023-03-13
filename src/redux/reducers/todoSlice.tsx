import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "config/api";
import { todoInitalState as initialState } from "constants/todoInitialState";
import { RootState } from "redux/store";
import { todo, todoState, todoUpdateType } from "ts/types/todo.types";

//fetch todos
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get<todo[]>(API_URL);
  return response?.data;
});

//add todo
export const addTodoAPI = createAsyncThunk(
  "todos/addTodos",
  async (todo: todo, thunkAPI) => {
    const response = await axios.post<todo>(API_URL, { ...todo });
    const state: RootState = thunkAPI.getState() as RootState;
    const newTodoList = addTodoUtil(response.data, state.todo.todoList);
    return newTodoList;
  }
);

//delete todo
export const deleteTodoAPI = createAsyncThunk(
  "todos/updateTodo",
  async (index: any, thunkAPI) => {
    try {
      await axios.delete<todo[]>(API_URL, { data: index });
    } catch (e) {
      //the api gives an 404 if I use delete request
      //so I catch the error so i can return it as a successful request
    } finally {
      const state: RootState = thunkAPI.getState() as RootState;
      const newTodoList = removeTodoUtil(index, state.todo.todoList);
      return newTodoList;
    }
  }
);

//update todo
export const updateTodoAPI = createAsyncThunk(
  "todos/deleteTodo",
  async (todoUpdate: todoUpdateType, thunkAPI) => {
    try {
      await axios.patch<todo[]>(API_URL, { data: { id: todoUpdate.index } });
    } catch (e) {
      //the api gives an 404 if I use PATCH request
      //so I catch the error so i can return it as a successful request
    } finally {
      const state: RootState = thunkAPI.getState() as RootState;
      const newTodoList = updateTodoUtil(todoUpdate, state.todo.todoList);
      return newTodoList;
    }
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    //this reducer close the snackbar using the status
    closeSnackbar: (state) => {
      state.status = "";
    },
  },
  extraReducers(builder) {
    builder

      //set loading while it's fetching the todos
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = "loading";
      })

      //when todos are fetched, update the state with the todos and more
      .addCase(fetchTodos.fulfilled, (state, action) => {
        updateState(state, action.payload);
        state.status = "initial data loaded";
        state.loaded = true;
        state.snackbarMessage = "TODOs loaded from API!";
      })

      //if it's rejected, modify the state using the updateOnError
      //updateonError add a message to the snackbar and set the status to error
      .addCase(fetchTodos.rejected, (state, action) => {
        updateOnError(state, action.error.message, "Error deleting the todo");
      })

      //if the todo is deleted, then set a message for the snackbar, update the todo list with
      //updateState
      .addCase(deleteTodoAPI.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.snackbarMessage = "TODO deleted!";

        updateState(state, action.payload);
      })
      //same as fetchTodos, the only change is the snackbar message
      .addCase(deleteTodoAPI.rejected, (state, action) => {
        updateOnError(
          state,
          action.error.message,
          "Error while deleting the todo"
        );
      })
      .addCase(deleteTodoAPI.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateTodoAPI.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.snackbarMessage = "TODO updated!";
        updateState(state, action.payload);
      })
      .addCase(updateTodoAPI.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateTodoAPI.rejected, (state, action) => {
        updateOnError(
          state,
          action.error.message,
          "Error while updating the todo"
        );
      })
      .addCase(addTodoAPI.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addTodoAPI.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.snackbarMessage = "TODO added!";
        updateState(state, action.payload);
      })
      .addCase(addTodoAPI.rejected, (state, action) => {
        updateOnError(
          state,
          action.error.message,
          "Error while adding the todo"
        );
      });
  },
});
export const { closeSnackbar } = todoSlice.actions;

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

function updateOnError(
  state: todoState,
  errorMessage: string,
  snackbarMessage: string
) {
  state.status = "failed";
  state.error = errorMessage;
  state.snackbarMessage = snackbarMessage;
}
