import { useRef, useState, type ChangeEvent } from 'react';

import { useStore } from '@/hooks';

export const OrderSelect = () => {
  const { changeOrder, sortBy } = useStore();
  const [localOrder, setLocalOrder] = useState(sortBy);

  const timeoutRef = useRef<number | null>(null);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as 'name' | 'population' | 'desc' | 'asc';

    setLocalOrder((prev) => {
      const newOrder =
        value === 'name' || value === 'population'
          ? { ...prev, by: value }
          : { ...prev, order: value };

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        changeOrder(newOrder);
      }, 300);

      return newOrder;
    });
  };
  return (
    <div>
      <label>
        <select value={localOrder.by} onChange={handleChange}>
          <option value={'name'}>country name</option>
          <option value={'population'}>population</option>
        </select>
      </label>
      <label>
        <select value={localOrder.order} onChange={handleChange}>
          <option value={'desc'}>desc</option>
          <option value={'asc'}>asc</option>
        </select>
      </label>
    </div>
  );
};
