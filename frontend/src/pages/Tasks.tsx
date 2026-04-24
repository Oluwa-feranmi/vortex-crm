import { useEffect, useState } from 'react';
import api from '../services/api';

const Tasks = () => {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    api.get('/tasks').then(res => setTasks(res.data));
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Tasks</h1>
      <div className="bg-white rounded-3xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-8 py-5 text-left font-medium">Title</th>
              <th className="px-8 py-5 text-left font-medium">Customer / Deal</th>
              <th className="px-8 py-5 text-left font-medium">Due Date</th>
              <th className="px-8 py-5 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t: any) => (
              <tr key={t.id} className="border-t hover:bg-gray-50">
                <td className="px-8 py-5 font-medium">{t.title}</td>
                <td className="px-8 py-5">{t.customer_name || t.deal_title}</td>
                <td className="px-8 py-5">{t.due_date}</td>
                <td className="px-8 py-5">
                  <span className={`px-4 py-1 text-sm rounded-full ${
                    t.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {t.status}
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

export default Tasks;