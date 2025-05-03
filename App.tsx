// iphone-import-calculator/src/App.tsx
import React, { useState } from 'react';
import { globalPrices, registryCosts } from './data/dummyPrices';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function App() {
  const [selectedModel, setSelectedModel] = useState<string>('iPhone 14');
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const globalPrice = globalPrices.find(p => p.model === selectedModel)?.price || 0;
    const registry = registryCosts[selectedModel] || 0;
    const iranPriceEstimate = globalPrice + registry;
    const marketPrice = iranPriceEstimate * 1.3; // فرضاً 30٪ سود بازار ایران

    setResult({
      labels: ['Global Price', 'Registry Cost', 'Estimated Iran Price', 'Market Price'],
      values: [globalPrice, registry, iranPriceEstimate, marketPrice]
    });
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">iPhone Import Calculator</h1>
      <select
        className="border p-2 w-full mb-4"
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
      >
        {globalPrices.map((phone) => (
          <option key={phone.model} value={phone.model}>{phone.model}</option>
        ))}
      </select>
      <button onClick={handleCalculate} className="bg-blue-600 text-white px-4 py-2 rounded">
        Calculate
      </button>

      {result && (
        <div className="mt-6">
          <Bar
            data={{
              labels: result.labels,
              datasets: [
                {
                  label: 'Price (USD)',
                  data: result.values,
                  backgroundColor: 'rgba(59, 130, 246, 0.6)',
                }
              ]
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                title: { display: true, text: 'Price Comparison' }
              }
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
