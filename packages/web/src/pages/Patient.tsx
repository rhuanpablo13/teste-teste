import { useCallback, useEffect, useState } from 'react';
import { dropDown, filter, getList, update } from '../server';
import List from '../components/List';
import { ItemList } from '../components/ItemList';

import ModalComponent from '../components/Modal';
import PatientForm from '../components/PatientForm';
import { UserPlus, WarningCircle } from 'phosphor-react';
import { FilterForm } from '../components/FilterForm';
import FormAction from '../components/FormAction';
import { NotFound } from '../components/NotFound';
import React from 'react';
import { useToast } from '../contexts/toast';
import { ConfimationModal } from '../components/ConfimationModal';
import { COORDENADOR, permissionAuth } from '../contexts/permission';

export interface PacientsProps {
  id: string;
  nome: string;
  responsavel: string;
  telefone: string;
  dataNascimento: string;
  convenio: string;
  vaga: any;
}

interface OptionProps {
  id: string;
  nome: string;
}

export default function Patient() {
  const { perfil } = permissionAuth();

  const [patients, setPatients] = useState<PacientsProps[]>([]);
  const [patient, setPatient] = useState<any>();
  const [open, setOpen] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  const [paciente, setListPaciente] = useState([] as OptionProps[]);
  const [periodo, setListPeriodo] = useState([] as OptionProps[]);
  const [convenio, setListConvenio] = useState([] as OptionProps[]);
  const [tipoSessao, setListTipoSessao] = useState([] as OptionProps[]);
  const [especialidade, setListEspecialidade] = useState([] as OptionProps[]);
  const [status, setListStatus] = useState([] as OptionProps[]);
  const { renderToast } = useToast();

  const renderDropDownPaciente = async () => {
    setListPaciente([]);
    const pacienteState: OptionProps[] = await dropDown('paciente');
    setListPaciente(pacienteState);
  };

  const renderDropDownPeriodo = async () => {
    const periodoState: OptionProps[] = await dropDown('periodo');
    setListPeriodo(periodoState);
  };

  const renderDropDownConvenio = async () => {
    const convenioState: OptionProps[] = await dropDown('convenio');
    setListConvenio(convenioState);
  };

  const renderDropDownTipoSessao = async () => {
    const tipoSessaoState: OptionProps[] = await dropDown('tipo-sessao');
    setListTipoSessao(tipoSessaoState);
  };

  const renderDropDownEspecialidade = async () => {
    const especialidadeState: OptionProps[] = await dropDown('especialidade');
    setListEspecialidade(especialidadeState);
  };

  const renderDropdownStatus = useCallback(async () => {
    const statusState: OptionProps[] = await dropDown('status');
    setListStatus(statusState);
  }, []);

  const renderPatient = useCallback(async () => {
    setPatients([]);
    const pacientes = await getList('pacientes');
    setPatients(pacientes);
  }, []);

  const sendUpdateListPatient = async (data: any, filter: any) => {
    handleSubmitFilter(filter);

    renderToast({
      type: 'success',
      title: data.message,
      message: data.data,
      open: true
    });
  };

  const handleDisabledUser = async () => {
    setOpenConfirm(false);
    try {
      const response = await update('paciente/desabilitar', {
        id: patient.id,
        disabled: !patient.disabled
      });
      handleSubmitFilter({ disabled: patient.disabled });
      renderToast({
        type: 'success',
        title: response.data.message,
        message: response.data.data,
        open: true
      });
    } catch (error) {
      renderToast({
        type: 'failure',
        title: 'Erro!',
        message: 'Não foi possível excluí-lo',
        open: true
      });
    }
  };

  const handleSubmitFilter = async (formState: any) => {
    const format: any = {
      naFila: !formState.naFila,
      disabled: !!formState.disabled,
      devolutiva: !!formState.devolutiva
    };
    delete formState.naFila;
    delete formState.disabled;
    delete formState.devolutiva;

    await Object.keys(formState).forEach((key: any) => {
      format[key] = formState[key].id || undefined;
      // format[key] = formState[key].map((item: any) => {
      //   switch (true) {
      //     case Array.isArray(item) && !('id' in item):
      //       return item[0].id
      //     case 'id' in item:
      //       return item.id
      //     default:
      //       return item
      //   }
      // })
    });

    const response = await filter('pacientes', format);
    const lista: PacientsProps[] = response.status === 200 ? response.data : [];
    setPatients(lista);
  };

  const renderButtom = () => {
    return perfil !== COORDENADOR ? (
      <div className="flex items-end justify-start">
        <FormAction
          handleSubmit={() => {
            setPatient(null);
            setOpen(true);
          }}
          text="Cadastrar"
          action="button"
        >
          <UserPlus
            size={12}
            onClick={() => {
              setPatient(null);
              setOpen(true);
            }}
          />
        </FormAction>
      </div>
    ) : (
      <></>
    );
  };

  const formtDate = (value: PacientsProps) => {
    const data = {
      id: value.id,
      nome: value.nome,
      dataNascimento: value.dataNascimento,
      telefone: value.telefone,
      responsavel: value.responsavel,
      periodoId: value.vaga.periodo,
      convenioId: value.convenio,
      statusId: value.vaga.status,
      dataContato: value.vaga.dataContato,
      especialidades: value.vaga.especialidades.map(
        (item: any) => item.especialidade
      ),
      tipoSessaoId: value.vaga.tipoSessao,
      observacao: value.vaga.observacao
    };
    setPatient(data);
    setOpen(true);
  };

  useEffect(() => {
    perfil === COORDENADOR
      ? handleSubmitFilter({ naFila: true })
      : renderPatient();
    renderDropDownPeriodo();
    renderDropDownConvenio();
    renderDropDownTipoSessao();
    renderDropDownEspecialidade();
    renderDropDownPaciente();
    renderDropdownStatus();
  }, []);

  return (
    <div className="grid gap-8">
      <FilterForm
        onSubmit={handleSubmitFilter}
        paciente={paciente}
        periodo={periodo}
        convenio={convenio}
        tipoSessao={tipoSessao}
        especialidade={especialidade}
        status={status}
        onResetForm={renderPatient}
      >
        {renderButtom()}
      </FilterForm>
      <fieldset className="py-2 px-0 sm:px-4 w-full text-center bg-white rounded-lg border shadow-md overflow-hidden items-center">
        <List>
          {patients.length ? (
            patients.map((item: any) => (
              <ItemList
                key={item.id}
                item={item}
                onEdit={formtDate}
                sendUpdateListPatient={sendUpdateListPatient}
                onDelete={(item: any) => {
                  setPatient(item);
                  setOpenConfirm(true);
                }}
              />
            ))
          ) : (
            <NotFound />
          )}
        </List>

        {open && perfil !== COORDENADOR && (
          <ModalComponent
            title="Cadastro de Paciente"
            open={open}
            onClose={() => setOpen(false)}
            width={300}
          >
            <PatientForm
              onClose={() => {
                renderDropDownPaciente();
                renderPatient();
                setOpen(false);
              }}
              pacientes={paciente}
              periodo={periodo}
              convenio={convenio}
              tipoSessao={tipoSessao}
              especialidade={especialidade}
              status={status}
              value={patient}
            />
          </ModalComponent>
        )}

        <ConfimationModal
          open={openConfirm}
          width="400px"
          onSubmit={handleDisabledUser}
          title=""
          onClose={() => setOpenConfirm(false)}
        >
          <div>
            <WarningCircle size={64} className="mx-auto text-red-500 " />
            <div className="text-center">{`Deseja realmente ${
              patient?.disabled ? 'ativar' : 'inativar'
            } o paciente ${patient?.nome}?`}</div>
          </div>
        </ConfimationModal>
      </fieldset>
    </div>
  );
}
