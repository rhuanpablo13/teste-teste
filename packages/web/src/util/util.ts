import moment from 'moment';

export const colorsData: any = {
  TO: '#ef6c00',
  Fono: '#f6bf26',
  Psico: '#8e24aa',
  PsicoPEDAG: '#000000'
};

export const colorsTextData: any = {
  TO: '#ffffff',
  Fono: '#ffffff',
  Psico: '#ffffff',
  PsicoPEDAG: '#ffffff'
};

export const corEspecialidade = (type: string) => {
  let tipo = '';
  switch (type.toUpperCase()) {
    case 'TO':
      tipo = 'bg-to';
      break;
    case 'FONO':
      tipo = 'bg-fono';
      break;
    case 'PSICO':
      tipo = 'bg-psico';
      break;
    case 'PSICOPEDAG':
      tipo = 'bg-psico-pdeg';
      break;
    default:
      tipo = 'p-multiselect-token';
      break;
  }

  return tipo;
};

export const firtUpperCase = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const resetChipsMultiselect = (idForm: string) => {
  const chipsSelects = document.querySelectorAll(`${idForm} .chip`);

  chipsSelects.forEach((chip: any) => {
    const classChip = Object.values(chip.classList);
    const isSingle = classChip.includes('singleChip');

    if (isSingle) {
      chip.textContent = null;
    } else {
      chip.remove();
    }
  });
};

export const formatDataOnlyId = (body: any) =>
  Object.values(body).map((item: any) => {
    if (item.length) {
      switch (true) {
        case Array.isArray(item) && !('id' in item):
          return item[0].id;
        case 'id' in item:
          return item.id;
        default:
          return item;
      }
    }
  });

export const formatdate = (date: any) => {
  return moment(date).format('YYYY-MM-DD');
};
