import { ArrowsClockwise, User } from 'phosphor-react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import React from 'react';

export const ItemListSimple = ({ item, onClick, onResetSenha }: any) => {
  return (
    <li className="p-8 w-full text-center bg-white overflow-hidden">
      <div className="flex justify-between text-base font-medium text-gray-900">
        <h3>
          <a href="#">{item.nome}</a>
        </h3>
        <div className="flex">
          <button
            type="button"
            className="font-medium text-red-600 hover:text-violet-500"
            onClick={e => {
              item.ativo = false;
              return onClick(item);
            }}
          >
            Desabilitar
          </button>
        </div>
      </div>

      <div className="mt-1 text-sm text-gray-500 flex items-center gap-2">
        <User size={12} />
        {item.login}
      </div>

      <div className="flex text-sm items-end justify-between text-gray-500 ">
        <span className="text-sm text-gray-500">
          {item.perfil.nome.toUpperCase()}
        </span>
        <button
          onClick={e => onResetSenha(e, item.id)}
          type="button"
          className="flex justify-center items-center gap-4 p-2 text-sm  text-white bg-yellow-400 rounded-lg border  hover:bg-violet-500"
        >
          <ArrowsClockwise size={24} />
          <span className=" hidden sm:block ">Reset de senha</span>
        </button>
      </div>
    </li>
  );
};
