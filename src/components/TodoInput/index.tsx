import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { addTodo, todo } from "redux/reducers/todoSlice";

const StyledInputField = styled(TextField)({
  "& label.Mui-focused": {
    color: "black",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
  },
});

export default function TodoInput() {
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  return (
    <Box className="px-4">
      <Box className="flex gap-4">
        <Box className="w-[75%]">
          <StyledInputField
            size="medium"
            className="w-full"
            id="outlined-controlled"
            label="Enter new todo"
            value={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setName(event.target.value);
            }}
          />
        </Box>
        <Box className="w-[25%]">
          <Button
            className="w-full h-full"
            variant="contained"
            onClick={() => {
              const newTodo: todo = {
                label: name,
                checked: false,
              };
              dispatch(addTodo(newTodo));
            }}
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
