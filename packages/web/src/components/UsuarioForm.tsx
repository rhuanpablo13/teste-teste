import { useCallback, useEffect, useState } from 'react';
import { userFields } from '../constants/formFields';
import { create, dropDown, getList, ResponseSuccessProps } from '../server';
import FormAction from './FormAction';
import Input from './Input';
import { useToast } from '../contexts/toast';
import { useForm } from 'react-hook-form';
import React from 'react';

const fields = userFields;
interface OptionProps {
  id: string;
  nome: string;
}

interface Props {
  onClose: () => void;
}

//userFields
const fieldsState: any = {};
fields.forEach((field: any) => (fieldsState[field.id] = ''));

export default function UsuarioForm({ onClose }: Props) {
  const [perfies, setPerfies] = useState<OptionProps[]>([]);
  const { renderToast } = useToast();
  const defaultValues = {
    nome: '',
    login: '',
    senha: '',
    perfilId: null
  };

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm({ defaultValues });

  const onSubmit = async (userState: any) => {
    try {
      const { data }: ResponseSuccessProps = await create('usuarios', {
        ...userState,
        perfilId: userState.perfilId.id
      });
      reset();
      renderToast({
        type: 'success',
        title: '',
        message: data.message,
        open: true
      });
      return onClose();
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

  const renderPerfil = useCallback(async () => {
    const perfilState: OptionProps[] = await dropDown('perfil');
    setPerfies(perfilState);
  }, []);

  useEffect(() => {
    renderPerfil();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} action="#">
      <div>
        {fields.map(field => (
          <Input
            key={field.id}
            labelText={field.labelText}
            id={field.id}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            options={field.type === 'select' ? perfies : undefined}
            validate={field.validate}
            errors={errors}
            control={control}
          />
        ))}
      </div>

      <FormAction handleSubmit={handleSubmit(onSubmit)} text="Cadastrar" />
    </form>
  );
}
