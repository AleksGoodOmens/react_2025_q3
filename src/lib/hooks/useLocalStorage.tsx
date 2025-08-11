import { useEffect, useState } from 'react';

export const useLocalStorage = (name: string) => {
  const [storageValue, setStorageValue] = useState<string>('light');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const item = window.localStorage.getItem(name);
      setStorageValue(item ? item : 'light');
    }
  }, [name]);

  const updateStorage = (value: string) => {
    const trimmedValue = value.trim();
    if (trimmedValue === storageValue) return;
    if (trimmedValue) {
      localStorage?.setItem(name, trimmedValue);
    } else {
      localStorage?.removeItem(name);
    }

    setStorageValue(trimmedValue);
  };

  const clearStorage = () => {
    localStorage?.removeItem(name);
  };

  return { storageValue, updateStorage, clearStorage };
};
