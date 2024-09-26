import React, { useState, useEffect } from "react";
import ToDoTable from "../../component/toDoTable/ToDoTable";
import SearchBar from "../../component/searchBar/SearchBar";
import ToDoCreateForm from "../../component/todoCreateForm/ToDoCreateForm";
import useGetAllToDo from "../../hooks/useGetAllToDo";

const ToDoContainer = () => {
  const [searchValue, setSearchValue] = useState("");
  const { isLoading, data: initialToDoL, error } = useGetAllToDo();
  const [toDoL, setToDoL] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 10;

  useEffect(() => {
    if (initialToDoL) {
      setToDoL(initialToDoL);
    }
  }, [initialToDoL]);

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  const DeleteToDo = (id) => {
    setToDoL(toDoL.filter((td) => td.id !== id));
  };

  const CreateToDo = (todo) => {
    setToDoL([todo, ...toDoL]);
  };

  const listByFilter = toDoL.filter((td) =>
    td.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Пагінація
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = listByFilter.slice(indexOfFirstTodo, indexOfLastTodo);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(listByFilter.length / todosPerPage);

  const maxVisiblePages = 3; // Кількість видимих сторінок

  const renderPagination = () => {
    const pageNumbers = [];

    if (currentPage > 1) {
      pageNumbers.push(
        <button key="prev" onClick={() => paginate(currentPage - 1)}>
          &laquo;
        </button>
      );
    }

    // Перша сторінка завжди показана
    pageNumbers.push(
      <button
        key={1}
        className={currentPage === 1 ? "active" : ""}
        onClick={() => paginate(1)}
      >
        1
      </button>
    );

    if (currentPage > maxVisiblePages) {
      pageNumbers.push(<span key="dots-left">...</span>);
    }

    // Динамічно додаємо видимі сторінки навколо поточної
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={currentPage === i ? "active" : ""}
          onClick={() => paginate(i)}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages - maxVisiblePages) {
      pageNumbers.push(<span key="dots-right">...</span>);
    }

    // Остання сторінка завжди показана
    if (totalPages > 1) {
      pageNumbers.push(
        <button
          key={totalPages}
          className={currentPage === totalPages ? "active" : ""}
          onClick={() => paginate(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    if (currentPage < totalPages) {
      pageNumbers.push(
        <button key="next" onClick={() => paginate(currentPage + 1)}>
          &raquo;
        </button>
      );
    }

    return pageNumbers;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="todo-app">
      <div className="todo-container">
        <div className="todo-header">To-Do List</div>
        <ToDoCreateForm CreateToDo={CreateToDo} />
        <SearchBar
          searchValue={searchValue}
          handleSearchValueChange={handleSearchValueChange}
        />
        <ToDoTable list={currentTodos} DeleteToDo={DeleteToDo} />

        {/* Пагінація */}
        <div className="pagination">{renderPagination()}</div>
      </div>
    </div>
  );
};

export default ToDoContainer;