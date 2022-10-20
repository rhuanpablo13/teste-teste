import moment from 'moment';
import {
  ArrowsClockwise,
  BezierCurve,
  CheckCircle,
  CircleWavyCheck,
  PencilSimple,
  Phone,
  TrashSimple,
  Users
} from 'phosphor-react';
import React from 'react';

import { useState } from 'react';
import { COORDENADOR, permissionAuth } from '../contexts/permission';
import { useToast } from '../contexts/toast';
import { update } from '../server';
import ModalComponent from './Modal';
import { ScheduleForm } from './ScheduleForm';
import { Tag } from './Tag';
import { Tooltip } from 'primereact/tooltip';

export const ItemList = ({
  item,
  onEdit,
  onDelete,
  sendUpdateListPatient
}: any) => {
  const { renderToast } = useToast();
  const [open, setOpen] = useState<boolean>(false);
  const { hasPermition, perfil } = permissionAuth();

  const renderTags = () => {
    return item.vaga.especialidades.map(
      ({ especialidade, agendado }: any, key: any) => {
        return (
          <Tag
            key={key}
            tipo={especialidade.nome}
            agendado={agendado}
            onClick={() => {
              setOpen(true);
            }}
          />
        );
      }
    );
  };

  const sendUpdate = async (url: string, body: any, filter: any) => {
    try {
      const { data } = await update(url, body);
      sendUpdateListPatient(data, filter);
    } catch ({ response }: any) {
      renderToast({
        type: 'failure',
        title: '401',
        message: 'Não foi possível agendá-lo!',
        open: true
      });
    }
  };

  const handleReturn = async (e: any) => {
    e.preventDefault();
    const body: any = {
      id: item.vaga.id,
      devolutiva: !item.vaga.devolutiva
    };
    sendUpdate('vagas/devolutiva', body, {
      naFila: !item.vaga.naFila,
      devolutiva: item.vaga.devolutiva
    });
  };

  const handleSchedule = async (e: any) => {
    e.preventDefault();
    if (item.vaga.especialidades.length === 1) {
      const especialidade = item.vaga.especialidades[0];
      const body: any = {
        pacienteId: item.id,
        vagaId: item.vaga.id,
        id: item.vaga.id,
        agendar: !especialidade.agendado ? [especialidade.especialidadeId] : [],
        desagendar: especialidade.agendado
          ? [especialidade.especialidadeId]
          : []
      };
      sendUpdate('vagas/agendar', body, { naFila: !item.vaga.naFila });
    } else {
      setOpen(true);
    }
  };

  const handleScheduleResponse = (agendar: number[], desagendar: number[]) => {
    const body: any = {
      pacienteId: item.id,
      vagaId: item.vaga.id,
      id: item.vaga.id,
      agendar: agendar,
      desagendar: desagendar
    };

    setOpen(false);
    sendUpdate('vagas/agendar', body, { naFila: !item.vaga.naFila });
  };

  const renderStatus = () => {
    const status = `${item.vaga.status.nome}`;
    switch (status) {
      case 'Urgente':
        return (
          <strong className="text-red-800  px-1 flex">
            {status}
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-800"></span>
            </span>
          </strong>
        );
      case 'Padrao':
        return <strong> {status} </strong>;
      case 'Voltou ABA':
        return <strong> {status} </strong>;
      default:
        return <strong> {status} </strong>;
    }
  };

  return (
    <>
      <li className="px-4  pb-4 pt-12 w-full text-center bg-white relative">
        <div className="flex-1">
          {perfil !== COORDENADOR && (
            <div className="flex gap-2 mt-[-2.5rem]">
              <PencilSimple
                size={24}
                className="cursor-pointer text-violet-800 hover:text-yellow-400 "
                onClick={() => {
                  onEdit(item);
                }}
              />
              {!item.disabled && (
                <TrashSimple
                  size={24}
                  className="cursor-pointer text-red-400 hover:text-violet-500"
                  onClick={() => {
                    onDelete(item);
                  }}
                />
              )}

              {item.disabled && (
                <CheckCircle
                  size={24}
                  className="cursor-pointer text-green-400 hover:text-violet-500"
                  onClick={() => {
                    onDelete(item);
                  }}
                />
              )}
            </div>
          )}
          <div>
            <div className="flex gap-2 absolute right-4  top-12 sm:top-8 ">
              {renderTags()}
            </div>

            <div className="flex gap-4 text-base font-medium text-gray-900 mt-16 sm:mt-6">
              <h3>
                <strong className="text-violet-900">
                  {item.nome.toUpperCase()}
                </strong>
                <span className="text-gray-500 text-xs ml-8">
                  {' '}
                  {item.idade}
                </span>
              </h3>
            </div>

            <div className="grid sm:flex justify-between text-base font-medium text-gray-500 text-left">
              <p className="mt-4 text-sm text-gray-500 flex gap-2">
                <Users size={12} />
                Responsável: {item.responsavel.toUpperCase()}
              </p>

              {perfil !== COORDENADOR ? (
                <div className="flex items-center gap-2 mt-4">
                  <Phone size={12} />
                  <p className="text-xs md:text-base font-sans-serif">
                    {' '}
                    {item.telefone}
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-2 mt-4"></div>
              )}

              <div className="text-left  sm:text-right text-gray-500 text-sm">
                <p className="font-bold my-4 sm:my-0"> {item.convenio.nome}</p>
                <p className="font-sans-serif">
                  {' '}
                  Inclusão: {moment(item.vaga.dataContato).format('DD/MM/YYYY')}
                </p>
              </div>
            </div>

            <div className=" grid sm:flex justify-start  justify-start text-xs text-start text-gray-500 mt-4 gap-6 text-start text-gray-500 mt-4 gap-6">
              <span>
                Período: <strong>{item.vaga.periodo.nome} </strong>
              </span>
              <span>
                Tipo: <strong>{item.vaga.tipoSessao.nome} </strong>
              </span>
              <span className="flex">Prioridade: {renderStatus()}</span>
              {item.vaga.devolutiva && (
                <span className="flex">
                  {' '}
                  Devolutiva:
                  <strong>
                    {' '}
                    {moment(item.vaga.dataDevolutiva).format('DD/MM/YYYY')}
                  </strong>
                </span>
              )}
            </div>
            <div className="max-w-xs">
              <Tooltip target=".obs" mouseTrack className="w-2/4 sm:w-1/4" />
              <p
                className="  justify-start text-xs  text-start text-gray-500 mt-4 obs text-ellipsis overflow-hidden"
                data-pr-tooltip={item.vaga.observacao}
              >
                {item.vaga.observacao}
              </p>
            </div>
          </div>
          <div className="flex gap-2 flex-1 items-end  md:justify-end justify-between text-sm ">
            {item.vaga.naFila &&
              !item.vaga.devolutiva &&
              hasPermition('btnAgendar') && (
                <button
                  className="group relative md:w-64 w-full  gap-2 items-center flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-900 hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600 mt-4"
                  onClick={handleSchedule}
                >
                  Agendado
                </button>
              )}

            {!item.vaga.naFila &&
              !item.vaga.devolutiva &&
              hasPermition('btnAgendar') && (
                <button
                  onClick={handleSchedule}
                  type="button"
                  className="group relative md:w-64  w-full flex items-center gap-2 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600 mt-4 cursor-pointer"
                >
                  <ArrowsClockwise size={24} />
                  <span className=" hidden sm:block ">Retornar</span>
                </button>
              )}

            {!item.vaga.naFila &&
              !item.vaga.devolutiva &&
              hasPermition('btnDevolutiva') && (
                <button
                  onClick={handleReturn}
                  type="button"
                  className="group relative md:w-64 w-full flex gap-2 items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-900 hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600 mt-4"
                >
                  <CircleWavyCheck size={16} />
                  <span className=" hidden sm:block ">Devolutiva</span>
                </button>
              )}

            {item.vaga.devolutiva && hasPermition('btnDevolutiva') && (
              <button
                onClick={handleReturn}
                type="button"
                className="group relative md:w-64  w-full flex items-center gap-2 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600 mt-4 cursor-pointer"
              >
                <ArrowsClockwise size={24} />
                <span className=" hidden sm:block ">Retornar Devolutiva</span>
              </button>
            )}
          </div>
        </div>
      </li>

      {open && (
        <ModalComponent
          title="Selecione a(s) especialidade(s) agendada(s)"
          open={open}
          onClose={() => setOpen(false)}
          width="sm"
        >
          <ScheduleForm
            onSubmit={handleScheduleResponse}
            especialidades={item.vaga.especialidades}
          />
        </ModalComponent>
      )}
    </>
  );
};
