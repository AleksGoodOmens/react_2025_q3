import { useEffect, useState } from 'react';

export const useLocalStorage = (name: string) => {
  const [storageValue, setStorageValue] = useState<string>('');

  useEffect(() => {
    let item: string = '';
    if (typeof window !== 'undefined') {
      item = window.localStorage.getItem(name) || '';
    }
    setStorageValue(item);
  }, [name]);

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
    setStorageValue('');
  };

  return { storageValue, updateStorage, clearStorage };
};
