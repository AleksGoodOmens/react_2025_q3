import { useCallback, useRef, useState, type ChangeEvent } from 'react';

import { useStore } from '@/hooks';

export const OrderSelect = () => {
  const sortBy = useStore((state) => state.sortBy);
  const changeOrder = useStore((state) => state.changeOrder);
  const [localOrder, setLocalOrder] = useState(sortBy);

  const timeoutRef = useRef<number | null>(null);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
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
    },
    [changeOrder]
  );
  return (
    <div className="flex gap-4 rounded-2xl border-2 bg-amber-500 px-2 capitalize">
      <label>
        <select
          className="capitalize"
          value={localOrder.by}
          onChange={handleChange}
        >
          <option className="capitalize" value={'name'}>
            country name
          </option>
          <option className="capitalize" value={'population'}>
            population
          </option>
        </select>
      </label>
      <label>
        <select
          className="capitalize"
          value={localOrder.order}
          onChange={handleChange}
        >
          <option className="capitalize" value={'desc'}>
            desc
          </option>
          <option className="capitalize" value={'asc'}>
            asc
          </option>
        </select>
      </label>
    </div>
  );
};
