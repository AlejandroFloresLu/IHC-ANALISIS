import React from 'react';
import { Bar } from 'react-chartjs-2';

export const ComponentEvaluationBars = ({ data }) => {
  if (!data) return null;

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Satisfacción Promedio (1-5)',
        data: data.data,
        backgroundColor: '#8b5cf6', // violet-500
        borderRadius: 8,
      }
    ]
  };

  const options = {
    indexAxis: 'y', // horizontal
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        max: 5,
        grid: { color: '#e7e5e4' },
        ticks: { color: '#57534e' }
      },
      y: {
        grid: { display: false },
        ticks: { color: '#1c1917' }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `Promedio: ${context.parsed.x.toFixed(2)}`
        }
      }
    }
  };

  return (
    <div className="glass-panel p-6 h-80">
      <h3 className="text-lg font-semibold mb-4 text-center text-stone-800">Evaluación de Heurísticas por Componente</h3>
      <div className="h-64">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};
