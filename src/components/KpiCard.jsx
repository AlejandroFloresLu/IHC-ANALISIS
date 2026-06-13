import React from 'react';
import { Frown } from 'lucide-react';

export const KpiCard = ({ title, value, subtitle }) => {
  return (
    <div className="glass-panel p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
      <div className="absolute -top-10 -right-10 text-rose-500/10">
        <Frown size={120} />
      </div>
      <h3 className="text-xl font-medium text-stone-600 mb-2 z-10">{title}</h3>
      <div className="text-5xl font-bold text-rose-500 z-10">
        {typeof value === 'number' ? value.toFixed(1) : value}%
      </div>
      {subtitle && (
        <p className="text-sm text-stone-500 mt-2 z-10">{subtitle}</p>
      )}
    </div>
  );
};
