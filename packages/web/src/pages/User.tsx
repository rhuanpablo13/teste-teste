import Modal from '../components/Modal';

import UsuarioForm from '../components/UsuarioForm';
import List from '../components/List';

import { getList, ResponseSuccessProps, search, update } from '../server';
import { useCallback, useEffect, useState } from 'react';
import { UserPlus, WarningCircle } from 'phosphor-react';
import Input from '../components/Input';
import { ItemListSimple } from '../components/ItemListSimple';
import { useToast } from '../contexts/toast';
import { NotFound } from '../components/NotFound';
import { useForm } from 'react-hook-form';
import { ConfimationModal } from '../components/ConfimationModal';
import React from 'react';

interface UserProps {
  id: string;
  nome: string;
  login: string;
  ativo: boolean;
  perfil: {
    id: string;
    nome: string;
  };
}

export default function User() {
  const [users, setUsers] = useState<UserProps[]>([]);
  const [user, setUser] = useState<UserProps>();
  const [word, setSearch] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  const { renderToast } = useToast();
  const {
    formState: { errors }
  } = useForm<any>();

  const renderUser = useCallback(async () => {
    const response: UserProps[] = await getList('usuarios');
    setUsers(response);
  }, []);

  const handleClick = async (e: any) => {
    e.preventDefault();

    const response = await search('usuarios', word);
    const lista: UserProps[] = response.status === 200 ? response.data : [];
    setUsers(lista);
  };

  const handleResetSenha = async (e: any, userId: any) => {
    e.preventDefault();
    try {
      const { message }: any = await getList(`/usuarios/reset-senha/${userId}`);
      renderToast({
        type: 'success',
        title: '',
        message,
        open: true
      });
    } catch ({ message }: any) {
      renderToast({
        type: 'failure',
        title: '401',
        message: `${message}`,
        open: true
      });
      return;
    }
  };

  const handleDisabledUser = async (e: any) => {
    e.preventDefault();

    try {
      await update('usuarios', {
        ativo: user?.ativo,
        id: user?.id,
        login: user?.login,
        nome: user?.nome,
        perfilId: user?.perfil.id
      });

      renderUser();
      setOpenConfirm(false);
      renderToast({
        type: 'success',
        title: ' Sucesso!! ',
        message: 'Usuário desativado!',
        open: true
      });
    } catch ({ response }) {
      msgError(response);
    }
  };

  const msgError = ({ data }: any) => {
    renderToast({
      type: 'failure',
      title: '401',
      message: data?.message || 'Usuário não encontrado!',
      open: true
    });
  };

  useEffect(() => {
    renderUser();
  }, []);

  return (
    <>
      <div className="grid grid-cols-8  justify-beteween gap-4">
        <Input
          handleChange={e => setSearch(e.target.value)}
          handleClick={handleClick}
          value={word}
          labelText="Search"
          id="search"
          name="search"
          type="search"
          placeholder="Buscar"
          customCol="col-span-8 sm:col-span-7"
          errors={errors}
        />
        <div className="col-span-8 sm:col-span-1 flex items-end justify-end">
          <button
            title="Cadastrar usuário"
            onClick={() => setOpen(true)}
            type="button"
            className="flex justify-center items-center  gap-4 p-2 w-full text-sm font-medium text-white bg-violet-700 rounded-lg border border-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
          >
            <UserPlus size={24} />
            <span className="block sm:hidden ">Cadastro de Usuário</span>
          </button>
        </div>
      </div>

      <fieldset className="py-2 px-4 w-full text-center bg-white rounded-lg border shadow-md overflow-hidden mt-10 ">
        <List>
          {users.length ? (
            users.map((item: any) => (
              <ItemListSimple
                key={item.id}
                item={item}
                onClick={(e: any) => {
                  setUser(e);
                  setOpenConfirm(true);
                }}
                onResetSenha={handleResetSenha}
              />
            ))
          ) : (
            <NotFound />
          )}
        </List>
      </fieldset>

      {open && (
        <Modal
          title="Cadastro de Usuário"
          open={open}
          onClose={() => setOpen(false)}
        >
          <UsuarioForm
            onClose={() => {
              renderUser();
              setOpen(false);
            }}
          />
        </Modal>
      )}

      <ConfimationModal
        open={openConfirm}
        width="400px"
        onSubmit={handleDisabledUser}
        title=""
        onClose={() => setOpenConfirm(false)}
      >
        <div>
          <WarningCircle size={64} className="mx-auto text-red-500" />
          <div>Deseja realmente desativar o usuário?</div>
        </div>
      </ConfimationModal>
    </>
  );
}
