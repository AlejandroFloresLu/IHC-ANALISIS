import React from 'react';
import { UserX, UserCheck, MessageCircle, BarChart2 } from 'lucide-react';

export const AdditionalInterviews = () => {
  return (
    <section className="space-y-6 pt-6">
      <h2 className="text-2xl font-bold text-stone-800 border-b border-stone-200 pb-2 flex items-center gap-2">
        <BarChart2 className="text-violet-500" />
        Análisis a Profundidad: Perfiles Contrastantes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Usuarios Inexpertos */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col gap-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center">
              <UserX size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-800">Perfil: Usuarios "Inexpertos"</h3>
              <p className="text-sm text-stone-500">Dos usuarios masculinos (36-50 años y Más de 50 años)</p>
            </div>
          </div>
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 flex-1">
            <h4 className="font-semibold text-stone-700 mb-2 flex items-center gap-2">
              <MessageCircle size={16} className="text-rose-400" />
              Resumen de Experiencia
            </h4>
            <p className="text-stone-600 text-sm leading-relaxed">
              Durante la interacción, estos dos usuarios (Puestos 11 y 12) reportaron múltiples fricciones al utilizar el prototipo inicial, al punto de no lograr completar la tarea 1. Sin embargo, es destacable que su curva de aprendizaje fue positiva: lograron adaptarse al sistema y completar con éxito la tarea 3 de forma mucho más fácil (aunque requirieron más tiempo), demostrando que la interfaz es asimilable incluso con menor dominio digital.
            </p>
          </div>
        </div>

        {/* Usuario Experto */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col gap-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center">
              <UserCheck size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-800">Perfil: Usuaria "Experta"</h3>
              <p className="text-sm text-stone-500">Participante femenina (26-35 años)</p>
            </div>
          </div>
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 flex-1">
            <h4 className="font-semibold text-stone-700 mb-2 flex items-center gap-2">
              <MessageCircle size={16} className="text-emerald-400" />
              Resumen de Experiencia
            </h4>
            <p className="text-stone-600 text-sm leading-relaxed">
              En contraste, esta usuaria (Puesto 5) mostró una adaptación inmediata y excepcional al entorno de la página. Su navegación fue completamente fluida y logró completar los flujos requeridos sin ninguna dificultad. Este perfil demuestra que el diseño actual y sus heurísticas funcionan óptimamente para usuarios que están familiarizados con el comercio electrónico.
            </p>
          </div>
        </div>

      </div>

      {/* Tabla Comparativa */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 mt-6">
        <h3 className="text-lg font-bold text-stone-800 mb-4 text-center">Comparativa Directa de Desempeño</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 text-stone-600 text-sm">
                <th className="p-4 border-b border-stone-200 rounded-tl-xl font-semibold">Métrica Evaluada</th>
                <th className="p-4 border-b border-stone-200 font-semibold text-rose-600">Usuarios "Inexpertos" (Puestos 11 y 12)</th>
                <th className="p-4 border-b border-stone-200 rounded-tr-xl font-semibold text-emerald-600">Usuaria "Experta" (Puesto 5)</th>
              </tr>
            </thead>
            <tbody className="text-sm text-stone-700">
              <tr className="border-b border-stone-100 hover:bg-stone-50/50 transition-colors">
                <td className="p-4 font-medium">Historial de E-commerce</td>
                <td className="p-4">Nulo o sin finalización previa de compras</td>
                <td className="p-4">Compradora frecuente en plataformas y apps</td>
              </tr>
              <tr className="border-b border-stone-100 hover:bg-stone-50/50 transition-colors">
                <td className="p-4 font-medium">Tasa de Éxito (Sin asistencia)</td>
                <td className="p-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2.5 bg-rose-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 w-2/3"></div>
                      </div>
                      <span className="text-amber-600 font-medium">Mejora Progresiva</span>
                    </div>
                    <span className="text-xs text-stone-500">Nula en tarea 1, Alta en tarea 3</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-2.5 bg-emerald-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-full"></div>
                    </div>
                    <span className="text-emerald-600 font-medium">Alta (100%)</span>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-stone-100 hover:bg-stone-50/50 transition-colors">
                <td className="p-4 font-medium">Fricción al Navegar</td>
                <td className="p-4">Alta (Múltiples pausas y dudas de navegación)</td>
                <td className="p-4">Nula (Navegación intuitiva y directa)</td>
              </tr>
              <tr className="hover:bg-stone-50/50 transition-colors">
                <td className="p-4 font-medium">Curva de Aprendizaje</td>
                <td className="p-4">Prolongada (Requiere onboarding)</td>
                <td className="p-4">Inmediata (Reconoce patrones de diseño)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
