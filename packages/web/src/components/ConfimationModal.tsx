import { Dialog } from 'primereact/dialog';
import React from 'react';

export const ConfimationModal = ({
  title,
  onSubmit,
  open,
  onClose,
  width = '50vw',
  children
}: any) => {
  const renderFooter = () => {
    return (
      <div className="flex flex-column justify-between h-8 gap-4 mb-5 ">
        <button
          className="py-6 px-4  border  hover:bg-zinc-200 rounded flex  justify-center items-center gap-3 w-32 text-center"
          onClick={onClose}
        >
          Cancelar
        </button>
        <button
          className="py-6 px-4 bg-violet-500 hover:bg-violet-600 rounded text-white flex justify-center items-center gap-3 w-32 text-center"
          onClick={e => {
            onSubmit(e);
          }}
        >
          Confirmar
        </button>
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center">
      <Dialog
        header={title}
        visible={open}
        style={{ width, display: 'grid !important' }}
        footer={renderFooter}
        onHide={onClose}
      >
        <div>{children}</div>
      </Dialog>
    </div>
  );
};
