import { AtomEffect } from "recoil";

const localStorageKey = (key: string) =>
  `event-expenses-tracker:useStateWithLocalStorage:${key}`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const persistToLocalStorage: AtomEffect<any> =
  ({ node, trigger, setSelf, onSet }) => {
    const key = node.key
    if (trigger === "get") {
      const storedValue = localStorage.getItem(localStorageKey(key));
      if (storedValue !== null) {
        setSelf(JSON.parse(storedValue))
      }
    }

    onSet((newValue) => {
      localStorage.setItem(localStorageKey(key), JSON.stringify(newValue));
    });
  };
