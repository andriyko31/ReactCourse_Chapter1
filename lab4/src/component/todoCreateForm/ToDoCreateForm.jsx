import React, { useState } from "react";

const ToDoCreateForm = ({ CreateToDo }) => {
  const [title, setTitle] = useState("");
  const [checked, setChecked] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      alert("Title cant be null ");
      return;
    }
    const newTd = {
      id: Date.now(),
      userId: Date.now() - Date.now() / 2,
      title: title,
      completed: checked,
    };
    CreateToDo(newTd);
  };
  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid #000",
          borderRadius: "5px",
          padding: "10px",
          width: "fit-content",
        }}
      >
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <div>
            <span>Title: </span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              style={{margin: "5px"}}
            />
          </div>

          <div>
            <span>Completed: </span>
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              name="completed"
              style={{margin: "5px"}}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          style={{marginTop: "10px", padding: "5px"}}
        >
          +
        </button>
      </form>
    </div>
  );
};

export default ToDoCreateForm;
