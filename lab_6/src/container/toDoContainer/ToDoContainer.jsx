import React, { useState } from "react";
import ToDoTable from "../../component/toDoTable/ToDoTable";
import SearchBar from "../../component/searchBar/SearchBar";
import ToDoCreateForm from "../../component/todoCreateForm/ToDoCreateForm";
import useGetAllToDo from "../../hooks/useGetAllToDo";

const Loader = ({ isLoading, children }) => {
  return (
     <>
        {isLoading &&  <div>Loading...</div>}
        {children}
     </>
  );
};

const ToDoContainer = () => {
  const [searchValue, setSearchValue] = useState(""); // Пошукове значення
  const { toDoL, isLoading, error, setToDoL } = useGetAllToDo(); // Використання хуку

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  const DeleteToDo = (id) => {
    setToDoL(toDoL.filter((td) => td.id !== id)); // Видалення завдання
  };

  const CreateToDo = (todo) => {
    setToDoL([todo, ...toDoL]); // Додавання нового завдання
  };

  const EditToDo = (id, newTitle) => {
    setToDoL(
      toDoL.map((td) => (td.id === id ? { ...td, title: newTitle } : td)) // Редагування завдання
    );
  };

  const listByFilter = toDoL.filter((td) =>
    td.title.toLowerCase().includes(searchValue.toLowerCase()) // Пошук завдань
  );

  if (error) {
    return <div>Error: {error.message}</div>; // Виведення помилки
  }

  return (
    <div className="todo-app">
      <div className="todo-container">
        <div className="todo-header">To-Do List</div>

        <Loader isLoading={isLoading}>
          <ToDoCreateForm CreateToDo={CreateToDo} /> {/* Форма створення завдання */}
          <SearchBar
            searchValue={searchValue}
            handleSearchValueChange={handleSearchValueChange}
          /> {/* Пошук */}
          {listByFilter.length > 0 ? (
            <ToDoTable
              list={listByFilter}
              DeleteToDo={DeleteToDo}
              EditToDo={EditToDo} // Додаємо логіку для редагування
            />
          ) : (
            <div>No ToDo items found</div>
          )}
        </Loader>
      </div>
    </div>
  );
};

export default ToDoContainer;
