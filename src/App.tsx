import React, { useState, useEffect } from 'react';
import { Todo } from './todoTypes';
import TodoItem from './components/TodoItem';
import "./index.css"

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: number, text: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text } : todo
    ));
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center">To-Do List</h1>
        <input
          type="text"
          className="w-full p-3 mt-4 bg-gray-800 border border-gray-600 rounded-md focus:outline-none"
          placeholder="Add a new task"
          onKeyDown={e => {
            if (e.key === 'Enter' && e.currentTarget.value) {
              addTodo(e.currentTarget.value);
              e.currentTarget.value = '';
            }
          }}
        />
        <div className="mt-6 space-y-4">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;