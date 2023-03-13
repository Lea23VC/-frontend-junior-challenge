import TodoList from "./components/TodoList";
import TodoResults from "./components/TodoResults";
import TodoForm from "./components/TodoForm";
import "./App.css";
import { fetchTodos } from "redux/reducers/todoSlice";
import { store } from "redux/store";
import MainLayout from "components/layouts/mainLayout";

const App = () => {
  store.dispatch(fetchTodos());
  return (
    <MainLayout>
      <div className="root">
        <TodoList />
        <TodoResults />
        <TodoForm />
      </div>
    </MainLayout>
  );
};

export default App;
