import { useState, useEffect } from 'react';

const useLoader = (data) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Якщо дані є, припиняємо завантаження
    if (data && data.length > 0) {
      setIsLoading(false);
    }
  }, [data]);

  return { isLoading, setIsLoading };
};

export default useLoader;
