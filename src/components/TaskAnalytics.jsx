import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const TaskAnalytics = ({ tasks }) => {
  if (!tasks || tasks.length === 0) return null;

  const chartData = {
    labels: tasks.map(t => `Tarea ${t.taskNumber}`),
    datasets: [
      {
        label: '% de Éxito',
        data: tasks.map(t => t.successRate),
        backgroundColor: 'rgba(139, 92, 246, 0.7)', // Violet
        borderColor: 'rgb(139, 92, 246)',
        borderWidth: 1,
        borderRadius: 4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { callback: (val) => val + '%' }
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Gráfico de Éxito */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
        <h3 className="text-xl font-bold text-stone-800 mb-4">Porcentaje de Éxito por Tarea</h3>
        <div className="h-64">
          <Bar data={chartData} options={options} />
        </div>
      </div>

      {/* Retroalimentación Cualitativa */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tasks.map(task => (
          <div key={`task-${task.taskNumber}`} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col">
            <h3 className="text-lg font-bold text-stone-800 border-b pb-2 mb-4">
              Tarea {task.taskNumber} - Observaciones
            </h3>
            
            {task.qualitativeNotes.length === 0 ? (
              <p className="text-stone-500 italic flex-1 flex items-center justify-center">
                Sin observaciones relevantes para esta tarea.
              </p>
            ) : (
              <div className="space-y-4 flex-1 overflow-y-auto max-h-80 pr-2">
                {task.qualitativeNotes.map((note, idx) => (
                  <div key={idx} className="bg-stone-50 p-4 rounded-xl border border-stone-100 text-sm">
                    <p className="font-semibold text-stone-700 mb-2">Usuario: {note.user}</p>
                    
                    {note.errors !== "-" && (
                      <p className="text-stone-600 mb-1">
                        <span className="font-medium text-rose-500">Errores: </span> 
                        {note.errors}
                      </p>
                    )}
                    
                    {note.frustration !== "-" && (
                      <p className="text-stone-600 mb-1">
                        <span className="font-medium text-orange-500">Gestos: </span> 
                        {note.frustration}
                      </p>
                    )}
                    
                    {note.notes !== "-" && (
                      <p className="text-stone-600">
                        <span className="font-medium text-blue-500">Notas: </span> 
                        {note.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
