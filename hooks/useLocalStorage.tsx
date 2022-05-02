import { useState, useEffect } from 'react';

const useLocalStorage = (
  key: string,
  initialValue: any,
  shouldUseEffect?: boolean
) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (shouldUseEffect) {
      return initialValue;
    } else {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        return initialValue;
      }
    }
  });

  useEffect(() => {
    if (shouldUseEffect) {
      const item = localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    }
  }, []);

  const setValue = (value: any) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {}
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
