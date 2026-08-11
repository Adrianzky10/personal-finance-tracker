import { useRef } from "react";

const useDebounce = () => {
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const debounce = <T extends unknown[]>(
    func: (...args: T) => void,
    delay: number,
  ) => {
    return (...args: T) => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(() => {
        func(...args);
        debounceTimeout.current = null;
      }, delay);
    };
  };

  return debounce;
};

export default useDebounce;
