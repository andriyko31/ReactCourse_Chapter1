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
     )
};

const ToDoContainer = () => {
  const [searchValue, setSearchValue] = useState("");
  const { toDoL, isLoading, error, setToDoL } = useGetAllToDo(); // Using useGetAllToDo with loader logic

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  const DeleteToDo = (id) => {
    setToDoL(toDoL.filter((td) => td.id !== id)); // Remove ToDo
  };

  const CreateToDo = (todo) => {
    setToDoL([todo, ...toDoL]); // Add new ToDo
  };

  const listByFilter = toDoL.filter((td) =>
    td.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Check for an error
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="todo-app">
      <div className="todo-container">
        <div className="todo-header">To-Do List</div>

        {/* Use the Loader component for handling loading */}
        <Loader isLoading={isLoading}>
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
