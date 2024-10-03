import { useState, useEffect } from 'react';
import useLoader from './useLoader'; // Import your useLoader hook

const useGetAllToDo = () => {
  const [toDoL, setToDoL] = useState([]);
  const [error, setError] = useState(null);
  const { isLoading, setIsLoading } = useLoader(true); // Use the useLoader hook for loading state

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const result = await response.json();
        setToDoL(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setIsLoading(false); // End loading
      }
    };

    fetchData();
  }, [setIsLoading]);

  return { toDoL, isLoading, error, setToDoL };
};

export default useGetAllToDo;
