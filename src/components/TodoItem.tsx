import React from 'react';
import { Todo } from '../todoTypes';
import "../index.css"

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const handleEdit = () => {
    const newText = prompt('Edit task:', todo.text);
    if (newText !== null && newText !== '') {
      onEdit(todo.id, newText);
    }
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-800 border border-gray-700 rounded-md hover:bg-gray-700 transition duration-200">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="mr-4"
      />
      <span className={`flex-1 text-lg ${todo.completed ? 'line-through text-gray-400' : 'text-white'}`}>
        {todo.text}
      </span>
      <div className="flex space-x-2">
        <button
          onClick={handleEdit}
          className="bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-500 transition duration-200"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-500 transition duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;