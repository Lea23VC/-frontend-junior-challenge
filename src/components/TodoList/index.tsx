import "./styles.css";
import TodoListItem from "../TodoListItem/index";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { todoState } from "redux/reducers/todoSlice";
const TodoList = () => {
  const todos: todoState = useSelector((state: RootState) => state.todo);

  const dispatch = useDispatch();

  const handleDelete = (todoId: any) => {
    // Fix an ability to delete task
  };

  const toggleCheck = (todoId: any, isChecked: any) => {
    // Fix an ability to toggle task
  };

  return (
    <div className="todo-list">
      <span className="todo-list-title">Things to do:</span>
      <div className="todo-list-content">
        {/* Fix an ability to render todos */}
      </div>
      <div className="no-todos">
        Looks like you&apos;re absolutely free today!
        {todos.todoList.map((todo, index) => (
          <TodoListItem
            label={todo.label}
            checked={todo.checked}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
