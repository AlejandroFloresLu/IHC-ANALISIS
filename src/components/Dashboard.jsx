import React from 'react';
import { DemographicsPieCharts } from './charts/DemographicsPieCharts';
import { UsabilityBarChart } from './charts/UsabilityBarChart';
import { DifficultyFunnelChart } from './charts/DifficultyFunnelChart';
import { SystemAttributesRadar } from './charts/SystemAttributesRadar';
import { ComponentEvaluationBars } from './charts/ComponentEvaluationBars';
import { QualitativeFeedbackTable } from './QualitativeFeedbackTable';
import { KpiCard } from './KpiCard';

export const Dashboard = ({ data }) => {
  if (!data) return null;

  return (
    <div className="min-h-screen bg-[#fafaf9] text-stone-900 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 mb-2">
            Métricas de Usabilidad (IHC)
          </h1>
          <p className="text-stone-500 text-lg">Análisis de la Interacción Humano-Computadora y Evaluación Heurística</p>
        </div>

        {/* --- SECCIÓN 1: DIAGNÓSTICO GENERAL --- */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-stone-800 border-b border-stone-200 pb-2">Diagnóstico General</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <UsabilityBarChart data={data.usability} />
            </div>
            <div className="md:col-span-1">
              <KpiCard 
                title="Tasa de Frustración" 
                value={data.frustrationRate} 
                subtitle="% de usuarios con deseos de abandonar" 
              />
            </div>
          </div>
          <div className="w-full">
            <DifficultyFunnelChart data={data.funnel} />
          </div>
        </section>

        {/* --- SECCIÓN 2: EVALUACIÓN HEURÍSTICA Y ATRIBUTOS --- */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-stone-800 border-b border-stone-200 pb-2">Atributos y Heurísticas (Puntos Críticos)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <SystemAttributesRadar data={data.systemAttributes} />
            </div>
            <div>
              <ComponentEvaluationBars data={data.componentEvaluations} />
            </div>
          </div>
        </section>

        {/* --- SECCIÓN 3: FEEDBACK CUALITATIVO --- */}
        <section className="space-y-6">
          <QualitativeFeedbackTable data={data.qualitativeFeedback} />
        </section>

        {/* --- SECCIÓN 4: CONTEXTO DEMOGRÁFICO --- */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-stone-800 border-b border-stone-200 pb-2">Datos Demográficos y Contexto (Pre-test)</h2>
          <DemographicsPieCharts data={data.demographics} />
        </section>
        
      </div>
    </div>
  );
};
