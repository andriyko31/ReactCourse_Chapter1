import React from 'react';

const SearchInput = ({ search, onSearchChange }) => {
  return (
    <div className="search-input">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
