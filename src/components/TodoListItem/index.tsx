import { useDispatch } from "react-redux";
import "./styles.css";
import { removeTodo, updateTodo } from "redux/reducers/todoSlice";

type TodoListItemProps = {
  onCheck?: () => void;
  checked?: boolean;
  onDelete?: () => void;
  label?: string;
  index: number;
};

export default function TodoListItem({
  onCheck,
  checked = false,
  onDelete,
  label,
  index,
}: TodoListItemProps) {
  const dispatch = useDispatch();

  function deleteTodo() {
    dispatch(removeTodo(index));
  }

  function togleTodo() {
    const updatedTodo = {
      label: label,
      checked: !checked,
    };
    const data = {
      todo: updatedTodo,
      index: index,
    };
    console.log("A");
    dispatch(updateTodo(data));
  }

  return (
    <div className="todo-list-item">
      <div
        tabIndex={0}
        role="checkbox"
        aria-checked
        className="todo-list-item-content w-full"
        onClick={() => togleTodo()}
      >
        <input
          tabIndex={-1}
          type="checkbox"
          checked={checked}
          onChange={() => togleTodo()}
        />
        <span className={checked ? "todo-list-item-checked" : ""}>{label}</span>
      </div>
      <button
        type="button"
        className="todo-list-item-delete"
        onClick={() => deleteTodo()}
      >
        x
      </button>
    </div>
  );
}
