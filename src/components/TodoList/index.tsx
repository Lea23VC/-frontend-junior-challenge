import "./styles.css";
import TodoListItem from "../TodoListItem/index";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { closeSnackbar } from "redux/reducers/todoSlice";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { todoState } from "ts/types/todo.types";
import { useEffect, useRef } from "react";

const TodoList = () => {
  const todos: todoState = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch();

  //create reference of div below list for scrolling
  const bottomRef = useRef(null);

  //if todolist change, trigger a scroll, so it can be viewed with a max height setting
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [todos.todoList]);

  return (
    <Box className="todo-list">
      <span className="todo-list-title">Things to do:</span>
      <Box className="todo-list-content">
        {/* Fix an ability to render todos */}
      </Box>

      <Box className="no-todos">
        {todos.todoList.length === todos.count
          ? "Looks like you're absolutely free today!"
          : "Here's your todo list for today!"}

        <Box className="py-2 max-h-[300px] min-h-[300px] scroll-todo">
          {todos.todoList.map((todo, index) => (
            <TodoListItem
              key={index}
              todo={todo}
              label={todo.label}
              checked={todo.checked}
              index={index}
            />
          ))}
          <Box ref={bottomRef} />
        </Box>
        <Box>
          <Snackbar
            open={todos.status === "succeeded"}
            autoHideDuration={5000}
            onClose={() => dispatch(closeSnackbar())}
            message={todos.snackbarMessage}
          />
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={todos.status === "loading"}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
      </Box>
    </Box>
  );
};

export default TodoList;
