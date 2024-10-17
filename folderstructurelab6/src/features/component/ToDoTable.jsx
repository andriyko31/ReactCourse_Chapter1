import React, { useState } from "react";

const ToDoTable = ({ list, DeleteToDo, EditToDo }) => {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [error, setError] = useState(""); // State for validation error

  const handleEditClick = (todo) => {
    if (editingId === todo.id) {
      if (editTitle.trim() === "") {
        setError("Title is required"); // Set error message if input is empty
      } else {
        EditToDo(todo.id, editTitle);
        setEditingId(null);
        setError(""); // Clear error message on successful save
      }
    } else {
      setEditingId(todo.id);
      setEditTitle(todo.title);
      setError(""); // Clear any previous error when starting to edit
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
                  <div>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className={error ? "error" : ""} // Add error class if there's an error
                    />
                    {error && <div className="error-message">{error}</div>} {/* Show error message */}
                  </div>
                ) : (
                  todo.title
                )}
              </td>
              <td>
                <button onClick={() => handleEditClick(todo)}>
                  {editingId === todo.id ? "Save" : "Edit"}
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
