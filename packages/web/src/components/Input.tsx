import { MagnifyingGlass } from 'phosphor-react';
import { Controller } from 'react-hook-form';
import { MultiSelectDemo } from './Inputs/MultiSelect';
import { InputMask } from 'primereact/inputmask';
import { Dropdown } from 'primereact/dropdown';
import { InputSwitch } from 'primereact/inputswitch';
import { Calendar } from 'primereact/calendar';

import React from 'react';
import { formatdate } from '../util/util';
import { COORDENADOR, permissionAuth } from '../contexts/permission';

const fixedInputClass =
  'rounded-md appearance-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500  focus:outline-none focus:ring-violet-500 focus:border-violet-600 focus:z-10 sm:text-xs ';

interface Props {
  handleChange?: (e: any, id?: string) => void;
  handleClick?: (e: any) => void;
  value?: any;
  labelText: string;
  id: string;
  name?: string;
  type: string;
  placeholder: string;
  customClass?: string;
  customCol?: string;
  options?: Array<OptionProps>;
  validate?: object;
  errors?: any;
  control?: any;
  disabled?: boolean;
}

interface OptionProps {
  id: string;
  nome: string;
}

export default function Input({
  handleChange,
  handleClick,
  value,
  labelText,
  id,
  name,
  type,
  placeholder,
  customClass,
  options,
  customCol,
  validate,
  errors,
  control,
  disabled
}: Props) {
  const { perfil } = permissionAuth();

  const renderType = () => {
    switch (type) {
      case 'select':
        return (
          <Controller
            name={id}
            control={control}
            rules={validate}
            render={({ field }: any) => (
              <Dropdown
                value={field.value}
                options={options}
                onChange={(e: any) => field.onChange(e.value)}
                optionLabel="nome"
                filter
                showClear
                filterBy="nome"
              />
            )}
          />
        );

      case 'multiselect':
        return (
          <Controller
            name={id}
            control={control}
            rules={validate}
            render={({ field }: any) => (
              <MultiSelectDemo
                id={field.id}
                value={field.value}
                onChange={(e: any) => {
                  return field.onChange(e.value);
                }}
                options={options}
              />
            )}
          />
        );

      case 'textarea':
        return (
          <Controller
            name={id}
            control={control}
            rules={validate}
            render={({ field }: any) => (
              <textarea
                id={field.id}
                {...field}
                value={field.value}
                className={fixedInputClass + customClass}
                placeholder={field.placeholder}
              />
            )}
          />
        );

      case 'switch':
        return (
          <Controller
            name={id}
            control={control}
            rules={validate}
            render={({ field }: any) => {
              return (
                <div className="grid grid-cols-6 justify-start items-center h-8">
                  <span className="col-span-4 text-[#685ec5]">
                    {' '}
                    {labelText}{' '}
                  </span>
                  <div className="col-span-2">
                    <InputSwitch
                      checked={field.value}
                      onChange={field.onChange}
                      color="#685ec5"
                      value={value}
                      disabled={disabled}
                    />
                  </div>
                </div>
              );
            }}
          />
        );
      case 'search':
        return (
          <form className="flex items-center" action="#" onSubmit={handleClick}>
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <MagnifyingGlass size={24} onClick={handleClick} />
              </div>
              <input
                onChange={handleChange}
                value={value}
                id={id}
                name={name}
                type={type}
                className={fixedInputClass + customClass}
                placeholder={placeholder}
              />
            </div>
            <button
              type="submit"
              className="p-2 ml-2 text-sm font-medium text-white bg-violet-700 rounded-lg border border-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
            >
              <MagnifyingGlass size={24} onClick={handleClick} />
            </button>
          </form>
        );
      case 'tel':
        return (
          <Controller
            name={id}
            control={control}
            rules={validate}
            render={({ field }: any) => (
              <InputMask
                value={field.value}
                key={field.id}
                type={type}
                className={'inputAnimado ' + fixedInputClass + customClass}
                mask="(99) 9999-9999"
                onChange={(e: any) => {
                  return field.onChange(e.value);
                }}
              />
            )}
          />
        );
      // case "date":
      //   return (
      //     <Controller
      //       name={id}
      //       control={control}
      //       rules={validate}
      //       render={({ field }: any) => (
      //         <Calendar
      //           value={field.value}
      //           key={field.id}
      //           dateFormat="dd/mm/yy"
      //           showIcon
      //           maxDate={new Date()}
      //           className={"inputAnimado "}
      //           onChange={(e: any) => {
      //             return field.onChange(formatdate(e.value));
      //           }}
      //         />
      //       )}
      //     />
      //   );
      default:
        return (
          <Controller
            name={id}
            control={control}
            rules={validate}
            render={({ field }: any) => (
              <input
                id={field.id}
                {...field}
                value={field.value}
                key={field.id}
                type={type}
                className={'inputAnimado ' + fixedInputClass + customClass}
              />
            )}
          />
        );
    }
  };

  return (
    <div
      className={customCol ? 'label-float ' + customCol : 'my-5 label-float'}
    >
      {renderType()}
      {type !== 'switch' && <label> {labelText} </label>}
      {errors[id] && (
        <p className="text-xs text-red-400 text-end">{errors[id].message}</p>
      )}
    </div>
  );
}
