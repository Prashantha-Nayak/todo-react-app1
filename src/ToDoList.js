// src/TodoList.js
import React, { useState } from 'react';
import './TodoList.css';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim() === '') {
      alert('Please write down a task');
      return;
    }

    setTodos([...todos, { text: inputValue, completed: false }]);
    setInputValue('');
  };

  const toggleComplete = (index) => {
    const newTodos = todos.map((todo, i) => {
      if (i === index) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const editTodo = (index) => {
    const updatedTask = prompt('Edit task:', todos[index].text);
    if (updatedTask !== null) {
      const newTodos = todos.map((todo, i) => {
        if (i === index) {
          return { ...todo, text: updatedTask, completed: false };
        }
        return todo;
      });
      setTodos(newTodos);
    }
  };

  const deleteTodo = (index) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const newTodos = todos.filter((_, i) => i !== index);
      setTodos(newTodos);
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const uncompletedCount = todos.length - completedCount;

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a task..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className={todo.completed ? 'completed' : ''}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(index)}
              />
              <span>{todo.text}</span>
            </label>
            <button className="edit-btn" onClick={() => editTodo(index)}>Edit</button>
            <button className="delete-btn" onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className="counter-container">
        <p>Completed tasks: <span id="completed-counter">{completedCount}</span></p>
        <p>Uncompleted tasks: <span id="uncompleted-counter">{uncompletedCount}</span></p>
      </div>
    </div>
  );
}

export default TodoList;
