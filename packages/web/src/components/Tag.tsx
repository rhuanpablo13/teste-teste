import React, { useEffect, useState } from 'react';
const style =
  'text-xs text-white py-2 px-4 rounded-full  disabled:cursor-not-allowed cursor-pointer  opacity-25 disabled:opacity-100 ';

interface Props {
  onClick?: (e: any) => void;
  tipo: string;
  agendado: boolean;
}

export const Tag = ({ tipo, agendado, onClick }: Props) => {
  const [classColor, setClassColor] = useState<string>();

  const corEspecialidade = () => {
    let cor = '';
    switch (tipo.toLowerCase()) {
      case 'to':
        cor = 'bg-to';
        break;
      case 'fono':
        cor = 'bg-fono';
        break;
      case 'psico':
        cor = 'bg-psico';
        break;
      case 'psicopedag':
        cor = 'bg-psico-pegag';
        break;
      default:
        break;
    }

    setClassColor(cor);
  };

  useEffect(() => {
    corEspecialidade();
  }, []);

  return (
    <button
      onClick={onClick}
      className={style + classColor}
      disabled={!agendado}
    >
      {tipo}
    </button>
  );
};
