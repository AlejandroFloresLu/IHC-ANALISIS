import React from 'react';
import { MessageSquare, AlertCircle, Lightbulb } from 'lucide-react';

export const QualitativeFeedbackTable = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="glass-panel p-6 w-full">
      <h3 className="text-xl font-bold mb-6 text-stone-800 border-b border-stone-200 pb-2">Voz del Usuario (Feedback Cualitativo)</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-stone-50 border-b border-stone-200 text-stone-600">
              <th className="p-4 font-semibold w-12 text-center">ID</th>
              <th className="p-4 font-semibold"><div className="flex items-center gap-2"><AlertCircle size={18} className="text-rose-500" /> Dificultades reportadas</div></th>
              <th className="p-4 font-semibold"><div className="flex items-center gap-2"><Lightbulb size={18} className="text-emerald-500" /> Sugerencias de Diseño</div></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-stone-50/50 transition-colors">
                <td className="p-4 text-center text-stone-400 font-medium">#{item.id}</td>
                <td className="p-4 text-stone-700">{item.difficulty || <span className="text-stone-300 italic">Sin comentarios</span>}</td>
                <td className="p-4 text-stone-700">{item.suggestion || <span className="text-stone-300 italic">Sin comentarios</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
