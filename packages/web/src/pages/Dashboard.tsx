import React, { useCallback, useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { HourglassMedium, Strategy } from 'phosphor-react';
import { getList } from '../server';
import { NotFound } from '../components/NotFound';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      display: false
    },
    title: {
      display: false,
      text: 'Prioridades'
    }
  }
};

export const optionsDounuts = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
      display: true,
      align: 'start'
    },
    title: {
      display: false,
      text: 'Prioridades'
    }
  }
};

export const modelChart = {
  labels: [],
  datasets: [
    {
      label: '',
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1
    }
  ]
};

export default function Dashboard() {
  const [chatTipoSessao, setChatTipoSessao] = useState<any>(modelChart);
  const [chatEspecialidades, setChatEspecialidades] = useState<any>(modelChart);
  const [chatStatus, setChatStatus] = useState<any>(modelChart);
  const [wait, setChatWait] = useState<string>('');
  const [returnTrend, setReturnTrend] = useState<string>('');

  const setTipoSessao = useCallback(async () => {
    const data = await getList('/vagas/dashboard/tipoSessoes');
    setChatTipoSessao(data);
  }, []);

  const setsEspecialidades = useCallback(async () => {
    const data = await getList('/vagas/dashboard/especialidades');
    setChatEspecialidades(data);
  }, []);

  const setStatus = useCallback(async () => {
    const data = await getList('/vagas/dashboard/status');
    setChatStatus(data);
  }, []);

  const setWait = useCallback(async () => {
    const data = await getList('/vagas/wait');
    setChatWait(data);
  }, []);

  const setInfoReturns = useCallback(async () => {
    const { data } = await getList('/vagas/return');
    setReturnTrend(data);
  }, []);

  const renderChart = (type: string, data: any) => {
    return (
      <div
        className="py-2 px-4 col-span-2 text-center bg-white rounded-lg border shadow-md overflow-hidden mt-10 "
        key={type}
      >
        <div className="text-lg p-2 grid grid-rows gap-4">
          <span className="text-start text-lg"> {type}</span>

          {data && data.datasets[0].data.length ? (
            <div className="w-[60%] grid m-auto text-left">
              <Doughnut data={data} />
            </div>
          ) : (
            <NotFound />
          )}
        </div>
      </div>
    );
  };

  useEffect(() => {
    setStatus();
    setWait();
    setTipoSessao();
    setInfoReturns();
    setsEspecialidades();
  }, []);

  return (
    <div className="h-screen w-full m-auto mb-48">
      <div className="py-2 px-4 col-span-2   text-center bg-white rounded-lg border shadow-md ">
        <div className="text-start text-lg p-2  grid sm:flex justify-between gap-8 items-center">
          <div className="text-start text-lg flex items-center gap-2">
            <HourglassMedium size={32} />
            <div>
              <p>Tempo de espera:</p>
              <p>{wait}</p>
            </div>
          </div>

          <div className="text-start text-lg flex items-center gap-2">
            <Strategy size={32} />
            <div>Retornos para fila: {returnTrend}</div>
          </div>

          {chatStatus && (
            <div className="text-lg p-2 grid grid-rows gap-4">
              <div className=" grid m-auto text-left">
                <Bar options={options} data={chatStatus} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="  grid  grid-rows sm:grid-cols-4   gap-4 justify-beteween w-full mx-auto">
        {renderChart('Especialidades por Demanda', chatEspecialidades)}
        {renderChart('Tipo de sessão por Demanda', chatTipoSessao)}
      </div>
    </div>
  );
}
