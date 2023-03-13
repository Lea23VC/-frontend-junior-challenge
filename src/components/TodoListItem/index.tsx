//redux related
import { deleteTodoAPI, updateTodoAPI } from "redux/reducers/todoSlice";
import { store } from "redux/store";

//MUI components
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";

//types and interfaces
import { TodoListItemProps } from "ts/types/props.types";
import { todoUpdateType } from "ts/types/todo.types";

//css files
import "./styles.css";

export default function TodoListItem({ index, todo }: TodoListItemProps) {
  const { label, checked } = todo;
  async function deleteTodo() {
    await store.dispatch(deleteTodoAPI(index));
  }

  function togleTodo() {
    const updatedTodo = {
      label: label,
      checked: !checked,
    };
    const data: todoUpdateType = {
      todo: updatedTodo,
      index: index,
    };

    store.dispatch(updateTodoAPI(data));
  }

  return (
    <Box className="todo-list-item">
      <FormGroup className="hover:bg-slate-100 w-full px-2 rounded-sm transition-colors duration-200">
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onClick={() => {
                togleTodo();
              }}
            />
          }
          label={
            <Typography variant="body2" textAlign="left">
              <span
                className={`${
                  checked ? "todo-list-item-checked" : ""
                } select-none`}
              >
                {label}
              </span>
            </Typography>
          }
        />
      </FormGroup>
      <IconButton
        color="primary"
        aria-label="remove todo"
        component="label"
        onClick={() => deleteTodo()}
      >
        <CloseIcon className="text-black" color="inherit" />
      </IconButton>
    </Box>
  );
}
