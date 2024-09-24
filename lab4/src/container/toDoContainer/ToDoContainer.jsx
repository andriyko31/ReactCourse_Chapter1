import React, { useEffect, useState } from "react";
import ToDoTable from "../../component/toDoTable/ToDoTable";
import SearchBar from "../../component/searchBar/SearchBar";
import ToDoCreateForm from "../../component/todoCreateForm/ToDoCreateForm";
import useFetch from "../../hooks/useFetch";
const ToDoContainer = () => {
  const [toDoL, setToDoL] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [data] = useFetch("https://jsonplaceholder.typicode.com/todos");
  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  const DeleteToDo = (id) => {
    setToDoL(toDoL?.filter((td) => td.id !== id));
  };
  const CreateToDo = (todo) => {
    setToDoL([todo, ...toDoL]);
  };

  const listByFilter = toDoL.filter((td) =>
    td.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    if (data) {
      setToDoL(data);
    }
  }, [data]);

  return (
    <div className="to-do-container">
      <div>
        <ToDoCreateForm CreateToDo={CreateToDo} />
        <SearchBar
          searchValue={searchValue}
          handleSearchValueChange={handleSearchValueChange}
        />
        <ToDoTable list={listByFilter} DeleteToDo={DeleteToDo} />
      </div>
    </div>
  );
};

export default ToDoContainer;
