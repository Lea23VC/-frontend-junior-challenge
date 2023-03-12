import { useSelector } from "react-redux";
import "./styles.css";
import { RootState } from "redux/store";
import { todoState } from "redux/reducers/todoSlice";

const TodoResults = () => {
  const { count }: todoState = useSelector((state: RootState) => state.todo);

  // Fix an ability to calculate completed tasks

  return <div className="todo-results">Done: {count} </div>;
};

export default TodoResults;
