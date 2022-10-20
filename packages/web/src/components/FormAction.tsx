import React from 'react';

interface Props {
  handleSubmit: (e: any) => void;
  type: string;
  action: string;
  disabled?: boolean;
  text?: string;
  children?: JSX.Element;
  customCalss?: string;
}

const defaultClass =
  'group  relative w-full flex justify-center items-center  gap-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md ';

export default function FormAction({
  handleSubmit,
  type = 'Button',
  action = 'submit',
  text,
  children,
  disabled = false,
  customCalss = 'text-white bg-violet-900 hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600 disabled:bg-violet-800/25 disabled:not-allowed'
}: any) {
  return (
    <>
      {type === 'Button' ? (
        <button
          type={action}
          className={defaultClass + customCalss}
          onClick={handleSubmit}
          disabled={disabled}
        >
          {children}
          {text}
        </button>
      ) : (
        <></>
      )}
    </>
  );
}
