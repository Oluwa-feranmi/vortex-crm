import { useEffect, useState } from 'react';
import api from '../services/api';

const Customers = () => {
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    api.get('/customers').then(res => setCustomers(res.data));
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Customers</h1>
      <div className="bg-white rounded-3xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-8 py-5 text-left font-medium">Name</th>
              <th className="px-8 py-5 text-left font-medium">Email</th>
              <th className="px-8 py-5 text-left font-medium">Company</th>
              <th className="px-8 py-5 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c: any) => (
              <tr key={c.id} className="border-t hover:bg-gray-50">
                <td className="px-8 py-5">{c.name}</td>
                <td className="px-8 py-5">{c.email}</td>
                <td className="px-8 py-5">{c.company}</td>
                <td className="px-8 py-5">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Active</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;