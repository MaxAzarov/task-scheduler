import { useCallback, useState } from "react";

function getStorageValue(key: string, defaultValue: string) {
  const saved = localStorage.getItem(key);
  if (saved) {
    const initial = JSON.parse(saved);
    return initial;
  } else {
    return defaultValue;
  }
}

const useLocalStorage = (key: string, defaultValue: string) => {
  const [item, setItem] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  const setValue = useCallback(
    (value: string | number) => {
      setItem(value);
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key]
  );

  return [item, setValue];
};

export default useLocalStorage;
