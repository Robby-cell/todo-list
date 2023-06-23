import { useEffect, useState } from "react";
// import Todo from "./Todo";
import { TodoItem } from "./Todo";
import TodoForm from "./TodoForm";
import { MouseEvent } from "react";
import "./App.css";

function App() {
  const [todos, setTodo] = useState(() => {
    const list = localStorage.getItem("ITEMS");
    if (list == null) return [];
    return JSON.parse(list);
  });

  const [newItem, updateNewItem] = useState("");

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  });

  const addTodo = (e: MouseEvent) => {
    e.preventDefault();

    console.log(todos);
    const newTodoValue = [...todos, new TodoItem(newItem)];
    setTodo(newTodoValue);

    updateNewItem("");
  };

  const handleButton = function (id: string, completed: boolean) {
    setTodo((currentTodos: TodoItem[]) => {
      return currentTodos.map((todo: TodoItem) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  };

  const deleteTodo = (id: string) => {
    setTodo((todos: TodoItem[]) => {
      return todos.filter((todo: TodoItem) => {
        return todo.id !== id;
      });
    });
  };

  return (
    <div className="app">
      <div className="todo-app">
        <TodoForm itemAdd={addTodo} content={newItem} update={updateNewItem} />

        <div className="todo-container">
          {!todos.length && <h1>No TODOs found.</h1>}
          {todos.map((todo: TodoItem) => {
            //<Todo title={todo.what} completed={todo.completed} />;
            return (
              <li key={todo.id} className="todo-item">
                <label className="todo-content">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={(e) => handleButton(todo.id, e.target.checked)}
                  />
                  {todo.what}
                </label>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
