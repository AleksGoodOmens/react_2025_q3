import { useEffect, useState } from 'react';

export const useLocalStorage = (name: string) => {
  const [storageValue, setStorageValue] = useState<string>(
    () => localStorage.getItem(name) || ''
  );

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === name) {
        setStorageValue(e.newValue || '');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [name]);

  const updateStorage = (value: string) => {
    const trimmedValue = value.trim();
    if (trimmedValue === storageValue) return;
    if (trimmedValue) {
      localStorage.setItem(name, trimmedValue);
    } else {
      localStorage.removeItem(name);
    }
    dispatchEvent(trimmedValue);

    setStorageValue(trimmedValue);
  };

  const clearStorage = () => {
    localStorage.removeItem(name);
    dispatchEvent();
  };

  const dispatchEvent = (value = '') => {
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: name,
        newValue: value,
      })
    );
  };

  return { storageValue, updateStorage, clearStorage };
};
