import { useState, useEffect } from "react";
import { DeleteIcon } from "./Icons";
import "./App.css";
import { Notify } from "./Notify";

function App() {
  const [todos, setTodos] = useState<[string, boolean][]>(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });

  const testLongList = false;

  useEffect(() => {
    if (testLongList) {
      setTodos([
        ["Top one", false],
        ["Learn TypeScript", false],
        ["Build a to-do list app", false],
        ["Build a to-do list app", false],
        ["Build a to-do list app", false],
        ["Build a to-do list app", false],
        ["Build a to-do list app", false],
        ["Build a to-do list app", false],
        ["Build a to-do list app", false],
        ["Build a to-do list app", false],
        ["Build a to-do list app", false],
        ["Build a to-do list app", false],
        ["Build a to-do list app", false],
        ["Build a to-do list app", false],
        ["Build a to-do list app", false],
        ["Build a to-do list app", false],
        ["Build a to-do list app", false],
        ["Build a to-do list app", false],
        ["Build a to-do list app", false],
        ["Build a to-do list app", false],
        ["Build a to-do list app", false],
        ["Build a to-do list app", false],
        ["Build a to-do list app", false],
        ["Build a to-do list app", false],
      ]);
    }
  }, [todos]);

  const [showNotify, setShowNotify] = useState(false);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleAddNewTodo(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const value = e.currentTarget.value.trim();
      if (value !== "") {
        setTodos([...todos, [value, false]]);
        e.currentTarget.value = "";
      }
    }
  }

  function toggleTodo(index: number) {
    const updated = todos.map((todo, i) =>
      i === index ? [todo[0], !todo[1]] : todo
    ) as [string, boolean][];
    setTodos(updated);
  }

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  function toggleNotify(message: any, title: any) {
    setTitle(title);
    setMessage(message);
    setShowNotify(true);
  }

  function handleClearAll() {
    if (todos.length === 0) {
      toggleNotify("Your to-do list is already empty!", "Error!");
      return;
    }

    setTodos([]);
    toggleNotify("Your to-do list has been cleared!", "Success!");
  }

  function handleClearCompleted() {
    if (todos.length === 0) {
      toggleNotify("Your to-do list is already empty!", "Error!");
      return;
    }

    const completedTodos = todos.filter((todo) => todo[1]);
    if (completedTodos.length === 0) {
      toggleNotify("There are no completed to-dos to clear!", "Error!");
      return;
    }

    setTodos(todos.filter((todo) => !todo[1]));
    toggleNotify("Your completed to-dos have been cleared!", "Success!");
  }

  useEffect(() => {
    if (showNotify) {
      const timer = setTimeout(() => setShowNotify(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [showNotify]);

  return (
    <>
      {showNotify && <Notify title={title} message={message} />}
      <div className="container">
        <div className="top-bit">
          <h1>To Do List</h1>
          <input
            type="text"
            placeholder="Add a todo here..."
            onKeyDown={handleAddNewTodo}
          />

          <div className="buttons">
            <button onClick={handleClearAll}>Clear All</button>
            <button onClick={() => handleClearCompleted()}>
              Clear Completed
            </button>
          </div>
        </div>
        <div className="todo-list-container">
          {todos.map((todo, index) => (
            <div className="todo-item" key={index}>
              <input
                type="checkbox"
                checked={todo[1]}
                onChange={() => toggleTodo(index)}
              />
              <p style={{ textDecoration: todo[1] ? "line-through" : "none" }}>
                {todo[0]}
              </p>
              <div
                className="delete-button"
                onClick={() => setTodos(todos.filter((_, i) => i !== index))}
              >
                <DeleteIcon />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
