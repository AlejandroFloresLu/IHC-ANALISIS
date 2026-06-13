import { useEffect, useState } from 'react';
import { fetchData } from './services/dataService';
import { Dashboard } from './components/Dashboard';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const result = await fetchData();
        setData(result);
      } catch (err) {
        setError('Error al cargar los datos desde Google Sheets. Por favor, intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-stone-600 text-lg">Cargando métricas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center p-6">
        <div className="glass-panel p-8 text-center max-w-md">
          <div className="text-rose-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-stone-800 mb-2">Ups, algo salió mal</h2>
          <p className="text-stone-500">{error}</p>
        </div>
      </div>
    );
  }

  return <Dashboard data={data} />;
}

export default App;
