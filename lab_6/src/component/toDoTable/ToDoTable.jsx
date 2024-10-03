import React, { useState } from "react";

const ToDoTable = ({ list, DeleteToDo, EditToDo }) => {
  const [editingId, setEditingId] = useState(null); // Зберігаємо ID завдання, яке редагуємо
  const [editTitle, setEditTitle] = useState(""); // Контрольоване поле для заголовку завдання

  const handleEditClick = (todo) => {
    if (editingId === todo.id) {
      // Зберегти зміни
      EditToDo(todo.id, editTitle);
      setEditingId(null); // При збереженні виходимо з режиму редагування
    } else {
      // Увімкнути режим редагування
      setEditingId(todo.id);
      setEditTitle(todo.title); // Встановити поточний заголовок для редагування
    }
  };

  return (
    <div className="todo-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>
                {editingId === todo.id ? (
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)} // Оновлюємо заголовок у стані
                  />
                ) : (
                  todo.title // Показуємо звичайний заголовок, якщо не редагуємо
                )}
              </td>
              <td>
                <button onClick={() => handleEditClick(todo)}>
                  {editingId === todo.id ? "Save" : "Edit"} {/* Міняємо текст кнопки */}
                </button>
                <button onClick={() => DeleteToDo(todo.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ToDoTable;
