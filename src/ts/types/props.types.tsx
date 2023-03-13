import { todo } from "./todo.types";

export type TodoListItemProps = {
  checked?: boolean;
  label?: string;
  index: number;
  todo: todo;
};
