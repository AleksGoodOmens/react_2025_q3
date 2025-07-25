import { useState } from 'react';

export const useLocalStorage = (name: string) => {
  const [storageValue, setStorageValue] = useState<string>(
    () => localStorage.getItem(name) || ''
  );

  const updateStorage = (value: string) => {
    const trimmedValue = value.trim();
    if (trimmedValue === storageValue) return;
    if (trimmedValue) {
      localStorage.setItem(name, trimmedValue);
    } else {
      localStorage.removeItem(name);
    }

    setStorageValue(trimmedValue);
  };

  const clearStorage = () => {
    localStorage.removeItem(name);
  };

  return { storageValue, updateStorage, clearStorage };
};
