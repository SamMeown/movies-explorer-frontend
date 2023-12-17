import { useState } from "react";

function useStoredState(key, defaultValue) {
  const initialValue = localStorage.getItem(key);
  const [value, setValue] = useState(initialValue !== null ? JSON.parse(initialValue) : defaultValue);

  function setAndStoreValue(v) {
    setValue(v);
    localStorage.setItem(key, JSON.parse(v));
  }

  return [value, setAndStoreValue];
}

export default useStoredState;
