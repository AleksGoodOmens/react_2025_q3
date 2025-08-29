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
    <section>
      <SearchNameInput />
      <OrderSelect />
      <RangeYearsInput />

      <Button onClick={handleClose}>Settings</Button>
      {show && createPortal(<Modal onClose={handleClose} />, document.body)}
    </section>
  );
};
