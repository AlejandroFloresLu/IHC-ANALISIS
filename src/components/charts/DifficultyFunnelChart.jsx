import React from 'react';
import { Bar } from 'react-chartjs-2';

export const DifficultyFunnelChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  const labels = data.map(d => d.phase);
  
  // Levels in expected stacked order
  const difficultyLevels = ["Muy fácil", "Fácil", "Neutral", "Difícil", "Muy difícil"];
  const colors = [
    '#10b981', // emerald-500
    '#34d399', // emerald-400
    '#94a3b8', // slate-400
    '#f43f5e', // rose-500
    '#be123c', // rose-700
  ];

  const datasets = difficultyLevels.map((level, index) => ({
    label: level,
    data: data.map(d => d[level] || 0),
    backgroundColor: colors[index],
  }));

  const chartData = {
    labels,
    datasets
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y', // horizontal bar chart
    scales: {
      x: {
        stacked: true,
        grid: { color: '#e7e5e4' },
        ticks: { color: '#57534e' }
      },
      y: {
        stacked: true,
        grid: { display: false },
        ticks: { color: '#1c1917' }
      }
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#1c1917' }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    }
  };

  return (
    <div className="glass-panel p-6 h-80">
      <h3 className="text-lg font-semibold mb-4 text-center">Embudo de Dificultad del Proceso</h3>
      <div className="h-64">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};
