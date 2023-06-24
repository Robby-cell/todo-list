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

  const [done, updateDone] = useState(() => {
    const list = localStorage.getItem("TODO_DONE");
    if (list == null) return [];
    return JSON.parse(list);
  });

  const [newItem, updateNewItem] = useState("");

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  });
  useEffect(() => {
    localStorage.setItem("TODO_DONE", JSON.stringify(done));
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

  const addDone = function (doneTodo: TodoItem) {
    updateDone((currentDone: TodoItem[]) => {
      return [...currentDone, doneTodo];
    });
  };

  const deleteDone = (id: string) => {
    updateDone((done: TodoItem[]) => {
      return done.filter((todo: TodoItem) => {
        return todo.id !== id;
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

        <div className="done-undone">
          <div className="todo-container">
            <h2 className="todo-info">Todos</h2>
            {!todos.length && (
              <h3 className="no-todo-found">No TODOs found.</h3>
            )}
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
                  {todo.completed && (
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        deleteTodo(todo.id);
                        addDone(todo);
                      }}
                    >
                      Mark Done
                    </button>
                  )}
                </li>
              );
            })}
          </div>

          <div className="done-container">
            <h2 className="todo-info">Done Todos</h2>
            {done.map((todo: TodoItem) => {
              return (
                <li key={todo.id} className="done-item">
                  <label className="done-content">
                    {/* <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={(e) => handleButton(todo.id, e.target.checked)}
                    /> */}
                    {todo.what}
                  </label>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteDone(todo.id)}
                  >
                    Oops!
                  </button>
                </li>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
