import TodoList from "./components/TodoList";
import TodoResults from "./components/TodoResults";
import TodoInput from "./components/TodoInput";
import "./App.css";
import { fetchTodos } from "redux/reducers/todoSlice";
import { store } from "redux/store";

const App = () => {
  store.dispatch(fetchTodos());
  return (
    <div className="root">
      <TodoList />
      <TodoResults />
      <TodoInput />
    </div>
  );
};

export default App;
