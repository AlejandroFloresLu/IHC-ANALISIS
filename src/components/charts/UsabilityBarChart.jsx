import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const UsabilityBarChart = ({ data }) => {
  if (!data) return null;

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Promedio Likert (1-5)',
        data: data.data,
        backgroundColor: '#ec4899', // pink-500
        borderRadius: 8,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        grid: { color: '#e7e5e4' },
        ticks: { color: '#57534e' }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#1c1917' }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `Promedio: ${context.parsed.y.toFixed(2)}`
        }
      }
    }
  };

  return (
    <div className="glass-panel p-6 h-80">
      <h3 className="text-lg font-semibold mb-4 text-center">Índice de Usabilidad Percibida</h3>
      <div className="h-64">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};
