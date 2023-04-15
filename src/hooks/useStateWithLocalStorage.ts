import { useEffect } from "react";
import { useState } from "react";

const localStorageKey = (key: string) => `event-expenses-tracker:useStateWithLocalStorage:${key}`;

export const useStateWithLocalStorage = <T>(
  defaultValue: T,
  key: string
): [T, (next: T | ((curr: T) => T)) => void] => {
  const [state, setState] = useState<T>(() => {
    const storedValue = localStorage.getItem(localStorageKey(key));
    if (storedValue === null) {
      return defaultValue;
    }

    return JSON.parse(storedValue);
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey(key), JSON.stringify(state));
  }, [defaultValue, key, state]);

  return [state, setState];
};
