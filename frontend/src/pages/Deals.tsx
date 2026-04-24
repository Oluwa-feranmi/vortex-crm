import { useEffect, useState } from 'react';
import api from '../services/api';

const Deals = () => {
  const [deals, setDeals] = useState<any[]>([]);

  useEffect(() => {
    api.get('/deals').then(res => setDeals(res.data));
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Deals Pipeline</h1>
      <div className="bg-white rounded-3xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-8 py-5 text-left font-medium">Title</th>
              <th className="px-8 py-5 text-left font-medium">Customer</th>
              <th className="px-8 py-5 text-left font-medium">Value</th>
              <th className="px-8 py-5 text-left font-medium">Stage</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((d: any) => (
              <tr key={d.id} className="border-t hover:bg-gray-50">
                <td className="px-8 py-5 font-medium">{d.title}</td>
                <td className="px-8 py-5">{d.customer_name}</td>
                <td className="px-8 py-5">${Number(d.value).toLocaleString()}</td>
                <td className="px-8 py-5">
                  <span className="px-4 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
                    {d.stage}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Deals;