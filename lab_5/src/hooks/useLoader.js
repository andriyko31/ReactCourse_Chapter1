import { useState } from "react";
import React from "react"; // Необхідно для використання React.createElement

const useLoader = (initialLoadingState = true) => {
  const [isLoading, setIsLoading] = useState(initialLoadingState);

  const Loader = ({ children }) => {
    if (isLoading) {
      return React.createElement('div', null, 'Loading...');
    }
    return React.createElement(React.Fragment, null, children);
  };

  return { isLoading, setIsLoading, Loader };
};

export default useLoader;
