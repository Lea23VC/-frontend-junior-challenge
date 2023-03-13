import Box from "@mui/material/Box";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { addTodoAPI } from "redux/reducers/todoSlice";
import { store } from "redux/store";
import { todo } from "ts/types/todo.types";
import { StyledInputField } from "components/StyledMUIComponents/forms/StyledInputField";

export default function TodoInput() {
  const [name, setName] = useState("");

  function dispatchTodo() {
    const newTodo: todo = {
      label: name,
      checked: false,
    };
    setName("");
    store.dispatch(addTodoAPI(newTodo));
  }

  return (
    <Box className="px-4">
      <Box className="flex gap-4 flex-col sm:flex-row">
        <Box className="w-full sm:w-[75%]">
          <StyledInputField
            size="medium"
            className="w-full"
            id="outlined-controlled"
            label="Enter new todo"
            value={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setName(event.target.value);
            }}
            onKeyDown={(ev) => {
              if (ev.key === "Enter" && name.length > 0) {
                dispatchTodo();
              }
            }}
          />
        </Box>
        <Box className="w-full sm:w-[25%]">
          <Button
            className="w-full h-full"
            variant="contained"
            onClick={() => {
              dispatchTodo();
            }}
            disabled={name.length < 1 ? true : false}
          >
            <Typography variant="button" className="font-bold">
              Add todo
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
