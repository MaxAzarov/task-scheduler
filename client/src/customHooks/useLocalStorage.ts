import { useEffect, useState } from "react";

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
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
