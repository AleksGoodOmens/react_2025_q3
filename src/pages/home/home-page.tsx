import { useState } from 'react';

import { Button, Heading, ThemeChanger } from '@/components';
import { ModalWindow } from '@/components/modal-window/modal-window';

export const HomePage = () => {
  const [isUncontrolledFormOpen, setIsUncontrolledFormOpen] =
    useState<boolean>(false);
  const [isControlledFormOpen, setIsControlledFormOpen] =
    useState<boolean>(false);
  return (
    <section>
      <header className="flex justify-center">
        <Heading variant="main" className="py-6 text-center">
          Form by AmensGood
        </Heading>
        <ThemeChanger />
      </header>
      <div className="flex justify-center gap-4">
        <Button
          onClick={() => setIsUncontrolledFormOpen((prev) => !prev)}
          variant="main"
        >
          show uncontrolled form
        </Button>
        <Button
          variant="minor"
          onClick={() => setIsControlledFormOpen((prev) => !prev)}
        >
          show controlled form
        </Button>
      </div>
      <ModalWindow
        onClose={() => setIsUncontrolledFormOpen((prev) => !prev)}
        isOpen={isUncontrolledFormOpen}
      >
        <h1>uncontrolled form</h1>
      </ModalWindow>
      <ModalWindow
        onClose={() => setIsControlledFormOpen((prev) => !prev)}
        isOpen={isControlledFormOpen}
      >
        <h1>controlled form</h1>
      </ModalWindow>
    </section>
  );
};
