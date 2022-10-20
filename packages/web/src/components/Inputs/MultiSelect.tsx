import { MultiSelect } from 'primereact/multiselect';
import { colorsData, colorsTextData } from '../../util/util';

interface Props {
  id: string;
  options?: Array<OptionProps>;
  value?: OptionProps;
  onChange: (e: Array<OptionProps>) => void;
}

interface OptionProps {
  id: string;
  nome: string;
}

export const MultiSelectDemo = ({ id, options, value, onChange }: Props) => {
  const setColorChips = () => {
    setTimeout(() => {
      const chips: any =
        document.querySelectorAll('.p-multiselect-token') || [];

      chips.forEach((chip: any) => {
        const color = colorsData[chip.textContent];
        const text = colorsTextData[chip.textContent];

        chip.style.background = color;
        chip.style.color = text;
      });
    }, 0);
  };

  return (
    <MultiSelect
      id={id}
      display="chip"
      options={options}
      optionLabel="nome"
      filter
      value={value}
      onChange={(e: any) => {
        setColorChips();
        return onChange(e);
      }}
    />
  );
};
