import React, { useState } from 'react';
import AddToDoComponent from './components/AddToDoComponent';
import SearchInput from './components/SearchInput'; 
import ToDoTable from './components/ToDoTable';

function ToDoApp() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState('');

  const addTodo = (title) => {
    const newTodoItem = { id: Date.now(), title };
    setTodos([...todos, newTodoItem]);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="todo-app">
      <h1>ToDo App</h1>

      <AddToDoComponent onAdd={addTodo} />
      <SearchInput search={search} onSearchChange={setSearch} />
      <ToDoTable todos={filteredTodos} onRemove={removeTodo} />
    </div>
  );
}

export default ToDoApp;
