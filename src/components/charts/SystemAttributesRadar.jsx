import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export const SystemAttributesRadar = ({ data }) => {
  if (!data) return null;

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Promedio Percepción (1-5)',
        data: data.data,
        backgroundColor: 'rgba(236, 72, 153, 0.2)', // pink-500 with opacity
        borderColor: '#ec4899', // pink-500
        pointBackgroundColor: '#ec4899',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#ec4899',
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: '#e7e5e4' },
        grid: { color: '#e7e5e4' },
        pointLabels: { color: '#1c1917', font: { size: 12, family: 'Inter, sans-serif' } },
        min: 0,
        max: 5,
        ticks: { color: '#57534e', backdropColor: 'transparent' }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `Promedio: ${context.parsed.r.toFixed(2)}`
        }
      }
    }
  };

  return (
    <div className="glass-panel p-6 h-80 flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-4 text-center text-stone-800">Atributos del Sistema (IHC)</h3>
      <div className="w-full h-64">
        <Radar data={chartData} options={options} />
      </div>
    </div>
  );
};
