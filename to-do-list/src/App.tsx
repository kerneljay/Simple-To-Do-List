import { useState, useEffect } from "react";
import "./App.css";
import { DeleteIcon } from "./Icons";

function App() {
  const [todos, setTodos] = useState<[string, boolean][]>(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });

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
    );
    setTodos(updated);
  }

  return (
    <div className="container">
      <h1>To Do List</h1>

      <input
        type="text"
        placeholder="Add a todo here..."
        onKeyDown={handleAddNewTodo}
      />

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
            <DeleteIcon />
          </div>
        ))}
      </div>

      <div className="buttons">
        <button onClick={() => setTodos([])}>Clear All</button>
        <button onClick={() => setTodos(todos.filter((todo) => !todo[1]))}>
          Clear Completed
        </button>
      </div>
    </div>
  );
}

export default App;
