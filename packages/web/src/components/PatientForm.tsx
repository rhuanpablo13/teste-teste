import { useState } from 'react';
import { patientFields } from '../constants/formFields';
import { useToast } from '../contexts/toast';
import { create, update } from '../server';
import FormAction from './FormAction';
import Input from './Input';
import { useForm } from 'react-hook-form';

const fields = patientFields;
interface OptionProps {
  id: string;
  nome: string;
}

interface Props {
  onClose: () => void;
  pacientes: OptionProps[];
  periodo: OptionProps[];
  convenio: OptionProps[];
  tipoSessao: OptionProps[];
  especialidade: OptionProps[];
  status: OptionProps[];
  value: any;
}

//userFields
const fieldsState: any = {};
fields.forEach((field: any) => (fieldsState[field.id] = ''));

export default function PatientForm({
  onClose,
  pacientes,
  periodo,
  convenio,
  tipoSessao,
  especialidade,
  status,
  value
}: Props) {
  const [disabled, onDisabled] = useState<boolean>(false);
  const { renderToast } = useToast();

  const defaultValues = value || {
    nome: '',
    dataNascimento: '',
    telefone: '',
    responsavel: '',
    periodoId: '',
    convenioId: '',
    statusId: '',
    dataContato: '',
    especialidades: [],
    tipoSessaoId: '',
    observacao: ''
  };

  const {
    reset,
    handleSubmit,
    formState: { errors },
    control
  } = useForm({ defaultValues });
  const onSubmit = async (body: any) => {
    onDisabled(true);
    try {
      let data;
      const formatValues = {
        ...body,
        periodoId: body.periodoId.id,
        convenioId: body.convenioId.id,
        statusId: body.statusId.id,
        tipoSessaoId: body.tipoSessaoId.id,
        especialidades: body.especialidades.map((item: OptionProps) => item.id)
      };

      if (value?.nome) {
        formatValues.id = value.id;
        data = await update('pacientes', formatValues);
      } else {
        data = await create('pacientes', formatValues);
      }

      reset();
      onDisabled(false);
      renderToast({
        type: 'success',
        title: '',
        message: data.data.message,
        open: true
      });

      return onClose();
    } catch (error) {
      onDisabled(false);
      renderToast({
        type: 'failure',
        title: '401',
        message: 'Não cadastrado!',
        open: true
      });
    }
  };

  return (
    <form
      action="#"
      onSubmit={handleSubmit(onSubmit)}
      id="form-cadastro-patient"
    >
      <div className="grid grid-cols-6 gap-4 mb-4 min-h-[300px] overflow-y-auto">
        {fields.map(field => (
          <Input
            key={field.id}
            labelText={field.labelText}
            id={field.id}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            customCol={field.customCol}
            errors={errors}
            validate={field.validate}
            control={control}
            options={
              field.type === 'select' || field.type === 'multiselect'
                ? eval(field.name)
                : undefined
            }
          />
        ))}
      </div>

      <FormAction
        handleSubmit={handleSubmit(onSubmit)}
        text={value?.nome ? 'Atualizar' : 'Cadastrar'}
        disabled={disabled}
        customCalss={
          value?.nome
            ? 'text-white bg-yellow-400 hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600 disabled:bg-yellow-400/25 disabled:not-allowed'
            : 'text-white bg-violet-900 hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600 disabled:bg-violet-800/25 disabled:not-allowed'
        }
      />
    </form>
  );
}
