export type todoUpdateType = {
  todo: {
    label: string;
    checked: boolean;
  };
  index: number;
};
export type todo = {
  label: string;
  checked?: boolean;
};
export type todoState = {
  todoList: todo[];
  count: number;
  status: string;
  error: string;
  snackbarMessage?: string;
  loaded: boolean;
};
