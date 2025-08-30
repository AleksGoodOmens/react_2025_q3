import { useState } from 'react';
import { createPortal } from 'react-dom';

import {
  Button,
  Modal,
  OrderSelect,
  RangeYearsInput,
  SearchNameInput,
} from '@/components';

export const ListControls = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow((prev) => !prev);
  };

  return (
    <section className="grid gap-2">
      <div className="flex">
        <SearchNameInput />
        <OrderSelect />
      </div>
      <RangeYearsInput />

      <Button onClick={handleClose} className="justify-self-end">
        Settings
      </Button>
      {show && createPortal(<Modal onClose={handleClose} />, document.body)}
    </section>
  );
};
