import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const baseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#1c1917',
        font: {
          family: 'Inter, sans-serif'
        }
      }
    }
  }
};

const defaultColors = [
  '#ec4899', // pink-500
  '#8b5cf6', // violet-500
  '#3b82f6', // blue-500
  '#10b981', // emerald-500
  '#f59e0b', // amber-500
  '#6366f1', // indigo-500
];

export const DemographicsPieCharts = ({ data }) => {
  if (!data) return null;

  const createChartData = (chartData) => ({
    labels: chartData.labels,
    datasets: [
      {
        data: chartData.data,
        backgroundColor: defaultColors,
        borderColor: '#ffffff',
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="glass-panel p-6 flex flex-col items-center">
        <h3 className="text-lg font-semibold mb-4 text-center">Rango de Edad</h3>
        <div className="w-full h-64 transition-transform duration-300 hover:scale-105">
          <Doughnut data={createChartData(data.age)} options={{...baseOptions, cutout: '65%'}} />
        </div>
      </div>
      <div className="glass-panel p-6 flex flex-col items-center">
        <h3 className="text-lg font-semibold mb-4 text-center">Dispositivos Principales</h3>
        <div className="w-full h-64 transition-transform duration-300 hover:scale-105">
          <Doughnut data={createChartData(data.devices)} options={{...baseOptions, cutout: '65%'}} />
        </div>
      </div>
      <div className="glass-panel p-6 flex flex-col items-center">
        <h3 className="text-lg font-semibold mb-4 text-center">Motivos de Abandono</h3>
        <div className="w-full h-64 transition-transform duration-300 hover:scale-105">
          <Doughnut data={createChartData(data.abandonment)} options={{...baseOptions, cutout: '65%'}} />
        </div>
      </div>
      <div className="glass-panel p-6 flex flex-col items-center">
        <h3 className="text-lg font-semibold mb-4 text-center">Frecuencia de Compras</h3>
        <div className="w-full h-64 transition-transform duration-300 hover:scale-105">
          <Doughnut data={createChartData(data.frequency)} options={{...baseOptions, cutout: '65%'}} />
        </div>
      </div>
    </div>
  );
};
