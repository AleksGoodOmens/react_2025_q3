import { useState, type ChangeEvent, type FormEvent } from 'react';

import { COLUMNS, type ActiveColumn } from '@/interfaces';

import { useStore } from '@/hooks';

import { Button, Heading } from '@/components';

interface ModalProps {
  onClose: () => void;
}

export const Modal = ({ onClose }: ModalProps) => {
  const { changeColumns, activeColumns } = useStore();
  const [state, setState] = useState(activeColumns);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    changeColumns(state);
    onClose();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.checked;
    console.log(value);
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const checkbox = () => {
    return COLUMNS.map((col) => {
      const value = col.split(' ').join('_') as ActiveColumn;
      return (
        <label key={col} className="flex flex-row-reverse justify-end gap-2">
          <Heading variant="small" Tag="h4">
            {col}
          </Heading>
          <input
            onChange={onChange}
            type="checkbox"
            name={value}
            id={value}
            checked={state[value]}
          />
        </label>
      );
    });
  };
  return (
    <div className="fixed top-0 left-0 grid h-full w-full items-center justify-center overflow-hidden bg-black/60">
      <section className="w-fit rounded-2xl bg-amber-700 p-4">
        <form onSubmit={onSubmit}>
          {checkbox()}
          <Button type="submit">accept</Button>
        </form>
        <Button onClick={onClose}>Close</Button>
      </section>
    </div>
  );
};
