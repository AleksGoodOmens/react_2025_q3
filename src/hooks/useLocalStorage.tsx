import { useState } from 'react';

export const useLocalStorage = (name: string) => {
  const [storageValue, setStorageValue] = useState<string>(
    () => localStorage.getItem(name) || ''
  );

  const updateStorage = (value: string) => {
    localStorage.setItem(name, value);
    setStorageValue(value);
  };

  const clearStorage = () => {
    localStorage.removeItem(name);
    setStorageValue('');
  };

  return { storageValue, updateStorage, clearStorage };
};
