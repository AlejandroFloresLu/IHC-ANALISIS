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
  const [activeTab, setActiveTab] = React.useState(0);

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

      {/* Retroalimentación Cualitativa (TABS) */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="flex overflow-x-auto border-b border-stone-200">
          {tasks.map((task, idx) => (
            <button
              key={task.taskNumber}
              onClick={() => setActiveTab(idx)}
              className={`px-6 py-4 font-semibold text-sm transition-colors whitespace-nowrap ${
                activeTab === idx 
                  ? 'border-b-2 border-violet-500 text-violet-600 bg-violet-50/30' 
                  : 'text-stone-500 hover:bg-stone-50 hover:text-stone-700'
              }`}
            >
              Tarea {task.taskNumber}
            </button>
          ))}
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-bold text-stone-800 mb-4">
            Observaciones Detalladas
          </h3>
          
          {tasks[activeTab].qualitativeNotes.length === 0 ? (
            <div className="p-8 text-center text-stone-500 bg-stone-50 rounded-xl italic">
              Sin observaciones relevantes para esta tarea.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tasks[activeTab].qualitativeNotes.map((note, idx) => (
                <div key={idx} className="bg-stone-50 p-4 rounded-xl border border-stone-100 text-sm hover:shadow-sm transition-shadow">
                  <p className="font-semibold text-stone-700 mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-xs">
                      #{note.user}
                    </span>
                    Usuario
                  </p>
                  
                  <p className="text-stone-600 mb-2">
                    <span className="font-medium text-emerald-500 block mb-1">Tiempo empleado: </span> 
                    {note.time && note.time !== "-" && note.time.toLowerCase() !== "sin" ? note.time + " s" : "No registrado"}
                  </p>
                  
                  <p className="text-stone-600 mb-2">
                    <span className="font-medium text-rose-500 block mb-1">Errores detectados: </span> 
                    {note.errors && note.errors !== "-" ? note.errors : "Sin errores detectados"}
                  </p>
                  
                  <p className="text-stone-600 mb-2">
                    <span className="font-medium text-orange-500 block mb-1">Gestos de frustración: </span> 
                    {note.frustration && note.frustration !== "-" ? note.frustration : "Sin gestos"}
                  </p>
                  
                  <p className="text-stone-600">
                    <span className="font-medium text-blue-500 block mb-1">Notas del observador: </span> 
                    {note.notes && note.notes !== "-" ? note.notes : "Sin observaciones"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
