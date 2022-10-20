import { ArrowsClockwise, UserFocus } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../components/Input';
import { useToast } from '../contexts/toast';
import { update } from '../server';

export default function Home() {
  const [user, setUser] = useState() as any;
  const [disabled, setDisabled] = useState(false);
  const { renderToast } = useToast();

  const {
    reset,
    handleSubmit,
    formState: { errors },
    control
  } = useForm();

  const renderUser = () => {
    const auth: any = sessionStorage.getItem('auth');
    const parse = JSON.parse(auth);
    setUser(parse);
  };

  const handleResetSenha = async (senha: any) => {
    setDisabled(true);
    try {
      senha.id = user.login;
      const { data }: any = await update(`/usuarios/reset-senha`, senha);
      setDisabled(false);
      reset();
      renderToast({
        type: 'success',
        title: '',
        message: data.message,
        open: true
      });
    } catch ({ message }: any) {
      renderToast({
        type: 'failure',
        title: '401',
        message: `${message}`,
        open: true
      });
      reset();
      return;
    }
  };

  useEffect(() => {
    renderUser();
  }, []);

  return (
    <div className="h-screen w-full m-auto">
      <div className="py-2 px-4 items-center text-center bg-white rounded-lg border shadow-md  mt-10">
        <div className="text-start text-lg p-2  grid  md:grid-cols-2  grid-rows-2  place-content-around gap-8 items-center mt-10">
          <div className="text-start  flex gap-4  col-spam-1 sm:col-spam-2">
            <UserFocus size={40} />
            <div>
              <span className="text-3xl"> {user?.nome}</span>
              <p className="text-md text-zinc-400"> {user?.login}</p>
            </div>
          </div>

          <div className="flex gap-2 col-spam-1 sm:col-spam-2 mb-10 md:mb-0">
            <Input
              labelText="Alterar senha"
              id="senha"
              name="senha"
              type="password"
              customCol=" w-full"
              errors={errors}
              validate={{ required: true }}
              control={control}
              placeholder="Alterar senha"
            />
            <button
              disabled={disabled}
              onClick={handleSubmit(handleResetSenha)}
              type="button"
              className=" col-spam-1 flex mt-4 justify-space-evenly items-center gap-4 p-2 text-sm  text-white bg-yellow-400 rounded-lg border  hover:bg-violet-500 cursor-pointer"
            >
              <ArrowsClockwise size={24} />
              {/* <span className=" hidden sm:block ">Alterar de senha</span> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
