import { useEffect, useState } from 'react';
import { loginFields } from '../constants/formFields';
import { useAuth } from '../contexts/auth';
import FormAction from './FormAction';
import FormExtra from './FormExtra';
import Input from './Input';

import { useForm } from 'react-hook-form';

const fields = loginFields;
const fieldsState: any = {};
fields.forEach((field: any) => (fieldsState[field.id] = ''));

interface FormProps {
  login: string;
  senha: string;
}

export default function Login() {
  const defaultValues = {
    login: '',
    senha: ''
  };

  const [checkState, setCheck] = useState<boolean>(false);
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control
  } = useForm<FormProps>({ defaultValues });
  const { Login } = useAuth();

  const onSubmit = async (data: FormProps) => {
    await Login(data);
  };

  const handleRememberPassword = async (checked: boolean) => {
    setCheck(checked);

    localStorage.setItem('rememberCheck', JSON.stringify(checked));
    if (checked) {
      localStorage.setItem(
        'rememberLogin',
        JSON.stringify({ login: watch('login'), senha: watch('senha') })
      );
    } else {
      localStorage.removeItem('rememberLogin');
    }
  };

  useEffect(() => {
    if (checkState) {
      localStorage.setItem(
        'rememberLogin',
        JSON.stringify({ login: watch('login'), senha: watch('senha') })
      );
    }
  }, []);

  useEffect(() => {
    const rememberLogin = localStorage.getItem('rememberLogin');
    if (rememberLogin) {
      const { login, senha } = JSON.parse(rememberLogin);
      setCheck(true);
      setValue('login', login);
      setValue('senha', senha);
    }
  }, []);

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="">
        {fields.map(field => (
          <Input
            key={field.id}
            labelText={field.labelText}
            id={field.id}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            validate={field.validate}
            errors={errors}
            control={control}
          />
        ))}
      </div>

      <FormExtra onChange={handleRememberPassword} value={checkState} />
      <FormAction
        handleSubmit={handleSubmit(onSubmit)}
        text="Entrar"
        action="submit"
      />
    </form>
  );
}
