/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useLayoutEffect, useState } from 'react';

import { Funnel, MagicWand } from 'phosphor-react';
import { filterFields } from '../constants/formFields';
import FormAction from './FormAction';
import Input from './Input';
import { useForm } from 'react-hook-form';
import { ATENDENTE, COORDENADOR, permissionAuth } from '../contexts/permission';

const fieldsConst = filterFields;

//userFields
const fieldsState: any = {};
fieldsConst.forEach((field: any) => (fieldsState[field.id] = ''));

interface OptionProps {
  id: string;
  nome: string;
}
interface Props {
  children: JSX.Element;
  onSubmit: (formState: any) => any;
  onResetForm: () => any;
  paciente: OptionProps[];
  periodo: OptionProps[];
  convenio: OptionProps[];
  tipoSessao: OptionProps[];
  especialidade: OptionProps[];
  status: OptionProps[];
}

export const FilterForm = ({
  children,
  onSubmit,
  paciente,
  periodo,
  convenio,
  tipoSessao,
  especialidade,
  status,
  onResetForm
}: Props) => {
  const { perfil } = permissionAuth();
  const [fields, setFields] = useState(fieldsConst);

  const defaultValues = {
    pacientes: [],
    periodos: [],
    status: [],
    especialidades: [],
    tipoSessoes: [],
    naFila: perfil === COORDENADOR ? true : false,
    disabled: false,
    devolutiva: false
  };

  const {
    clearErrors,
    setError,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control
  } = useForm({ defaultValues });

  const handleSubmit2 = (formState: any) => {
    if (formState.devolutiva) {
      setValue('naFila', true);
      formState.naFila = true;
    }

    onSubmit(formState);
  };
  const handleReset = () => {
    reset();
    onResetForm();
  };

  useLayoutEffect(() => {
    if (perfil === COORDENADOR) {
      const filterInput = fieldsConst.filter(field => field.id !== 'disabled');
      setFields(filterInput);
    }
  }, []);

  return (
    <fieldset className="py-2 px-4 w-full  bg-white rounded-lg border shadow-md sm:p-8 overflow-hidden relative">
      <legend className=" text-violet-500 ">Filtro</legend>
      <form
        id="form-filter-patient"
        action="#"
        onSubmit={handleSubmit(handleSubmit2)}
      >
        <div className="grid grid-cols-2 gap-4">
          {fields.map(field => (
            <Input
              key={field.id}
              labelText={field.labelText}
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              customCol={field.customCol}
              errors={errors}
              control={control}
              disabled={perfil === COORDENADOR && field.id === 'naFila'}
              options={field.type === 'select' ? eval(field.name) : undefined}
            />
          ))}
        </div>

        <div className="flex items-center mt-10">
          {children}
          <div className="sm:w-2/4 ml-auto grid grid-cols-2 gap-2">
            <FormAction
              customCalss="text-white bg-yellow-400 rounded-lg border  hover:bg-violet-500"
              handleSubmit={handleReset}
              text="Limpar"
            >
              <MagicWand size={12} onClick={handleSubmit(handleSubmit2)} />
            </FormAction>

            <FormAction
              handleSubmit={handleSubmit(handleSubmit2)}
              text="Pesquisar"
            >
              <Funnel size={12} onClick={handleSubmit(handleSubmit2)} />
            </FormAction>
          </div>
        </div>
      </form>
    </fieldset>
  );
};
