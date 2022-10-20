import { Modal } from 'flowbite-react';

const modalStyle =
  'fixed bg-white py-8 px-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  rounded-lg  shadow-lg shadow-black/25';

interface Props {
  children: JSX.Element;
  footer?: JSX.Element;
  title: string;
  width?: number | string;
  open: boolean;
  onClose: () => void;
}

export default function ModalComponent({
  children,
  open,
  title,
  footer,
  onClose,
  width = '4xl'
}: Props) {
  return (
    <Modal show={open} onClose={onClose} size={width}>
      <Modal.Header>
        <div className="text-2xl font-bold text-zinc-600 font-Raleway">
          {title}
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6 px-6 pb-8 sm:pb-6 lg:px-8 xl:pb-8">
          {children}
        </div>
      </Modal.Body>
    </Modal>
  );
}
