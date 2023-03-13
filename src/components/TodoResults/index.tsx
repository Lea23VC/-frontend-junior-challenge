//redux
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { todoState } from "ts/types/todo.types";

//MUI components
import Box from "@mui/material/Box";

//style files
import "./styles.css";

const TodoResults = () => {
  const { count }: todoState = useSelector((state: RootState) => state.todo);

  // Fix an ability to calculate completed tasks

  return <Box className="todo-results py-4">Done: {count} </Box>;
};

export default TodoResults;
