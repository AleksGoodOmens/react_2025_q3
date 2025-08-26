import { useState } from 'react';

import { useStore } from '@/hooks';

import { Button, Heading, ThemeChanger } from '@/components';
import { ControlledForm } from '@/components/controlled-form/ControlledForm';
import { ListOfItems } from '@/components/list-of-items/ListOfItems';
import { ModalWindow } from '@/components/modal-window/modal-window';
import { UncontrolledForm } from '@/components/uncontrolled-form/UncontrolledForm';

export const HomePage = () => {
  const [isUncontrolledFormOpen, setIsUncontrolledFormOpen] =
    useState<boolean>(false);
  const [isControlledFormOpen, setIsControlledFormOpen] =
    useState<boolean>(false);
  const { uncontrolledFormData, controlledFormData } = useStore();

  const handleCloseControlledForm = () => {
    setIsControlledFormOpen((prev) => !prev);
  };
  const handleCloseUnControlledForm = () => {
    setIsUncontrolledFormOpen((prev) => !prev);
  };

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
        onClose={handleCloseUnControlledForm}
        isOpen={isUncontrolledFormOpen}
      >
        <UncontrolledForm closeForm={handleCloseUnControlledForm} />
      </ModalWindow>
      <ModalWindow
        onClose={handleCloseControlledForm}
        isOpen={isControlledFormOpen}
      >
        <ControlledForm closeForm={handleCloseControlledForm} />
      </ModalWindow>
      <div className="grid grid-cols-2">
        <ListOfItems
          title="Data from Uncontrolled form"
          items={uncontrolledFormData}
        />
        <ListOfItems
          items={controlledFormData}
          title="Data from controlled form"
        />
      </div>
    </section>
  );
};
