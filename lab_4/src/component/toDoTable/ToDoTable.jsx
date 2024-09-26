import React from 'react';

const ToDoTable = ({ list, DeleteToDo }) => {
  return (
    <div className="todo-table-container">
      <table className="todo-table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">userId</th>
            <th scope="col">Title</th>
            <th scope="col">Completed</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.userId}</td>
              <td>{item.title}</td>
              <td>{item.completed ? 'Completed' : 'Not Completed'}</td>
              <td>
                <button type="button" onClick={() => DeleteToDo(item.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ToDoTable;
