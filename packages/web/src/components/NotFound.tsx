import { FolderOpen } from 'phosphor-react';

export const NotFound = () => {
  return (
    <span className="text-zinc-400  text-lg  uppercase flex items-center gap-4 m-auto mt-2">
      {' '}
      <FolderOpen size={24} /> Não há itens
    </span>
  );
};
