import TodoList from "./components/TodoList";
import TodoResults from "./components/TodoResults";
import TodoInput from "./components/TodoInput";
import "./App.css";

const App = () => {
  return (
    <div className="root">
      <TodoList />
      <TodoResults />
      <TodoInput />
    </div>
  );
};

export default App;
