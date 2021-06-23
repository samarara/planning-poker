import { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValues] = useState(value);

  useEffect(() => {
    const timeOutHandler = setTimeout(() => {
      setDebouncedValues(value);
    }, delay);

    return () => clearTimeout(timeOutHandler);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
