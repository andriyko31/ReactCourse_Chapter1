import React, { useState, useEffect } from "react";
import ToDoTable from "../../component/toDoTable/ToDoTable";
import SearchBar from "../../component/searchBar/SearchBar";
import ToDoCreateForm from "../../component/todoCreateForm/ToDoCreateForm";
import useGetAllToDo from "../../hooks/useGetAllToDo";
import useLoader from "../../hooks/useLoader";

const ToDoContainer = () => {
  const [searchValue, setSearchValue] = useState("");
  const { toDoL, isLoading: fetchLoading, error, setToDoL } = useGetAllToDo();
  const { isLoading, setIsLoading, Loader } = useLoader(fetchLoading); // Використовуємо наш хук

  useEffect(() => {
    // Синхронізуємо стан завантаження з useGetAllToDo
    if (!fetchLoading) {
      setIsLoading(false);
    }
  }, [fetchLoading, setIsLoading]);

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  const DeleteToDo = (id) => {
    setToDoL(toDoL.filter((td) => td.id !== id)); // Видаляємо завдання
  };

  const CreateToDo = (todo) => {
    setToDoL([todo, ...toDoL]); // Додаємо нове завдання
  };

  const listByFilter = toDoL.filter((td) =>
    td.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Перевірка на помилку
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="todo-app">
      <div className="todo-container">
        <div className="todo-header">To-Do List</div>

        {/* Використовуємо Loader для відображення контенту */}
        <Loader>
          <ToDoCreateForm CreateToDo={CreateToDo} />
          <SearchBar
            searchValue={searchValue}
            handleSearchValueChange={handleSearchValueChange}
          />
          {listByFilter.length > 0 ? (
            <ToDoTable list={listByFilter} DeleteToDo={DeleteToDo} />
          ) : (
            <div>No ToDo items found</div>
          )}
        </Loader>
      </div>
    </div>
  );
};

export default ToDoContainer;
