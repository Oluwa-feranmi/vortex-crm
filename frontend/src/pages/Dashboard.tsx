import { useEffect, useState } from 'react';
import api from '../services/api';
import { Users, DollarSign, CheckSquare, TrendingUp, ArrowUpRight } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalDeals: 0,
    totalTasks: 0,
    pipelineValue: 0,
    dealsByStage: [] as any[]
  });

  useEffect(() => {
    api.get('/dashboard')
      .then((res) => setStats(res.data))
      .catch((err) => console.error('Dashboard error:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
            <p className="text-gray-600 mt-2 text-lg">Overview of your sales pipeline • Updated in real-time</p>
          </div>
          <div className="text-sm text-gray-500">
            Today: {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Customers</p>
                <p className="text-5xl font-semibold text-gray-900 mt-4">{stats.totalCustomers}</p>
              </div>
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="mt-6 flex items-center text-emerald-600 text-sm font-medium">
              <ArrowUpRight className="w-4 h-4 mr-1" /> +12% from last month
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pipeline Value</p>
                <p className="text-5xl font-semibold text-gray-900 mt-4">
                  ${Number(stats.pipelineValue).toLocaleString()}
                </p>
              </div>
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center">
                <DollarSign className="w-8 h-8 text-emerald-600" />
              </div>
            </div>
            <div className="mt-6 flex items-center text-emerald-600 text-sm font-medium">
              <ArrowUpRight className="w-4 h-4 mr-1" /> +8% from last month
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Open Tasks</p>
                <p className="text-5xl font-semibold text-gray-900 mt-4">{stats.totalTasks}</p>
              </div>
              <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center">
                <CheckSquare className="w-8 h-8 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Deals</p>
                <p className="text-5xl font-semibold text-gray-900 mt-4">{stats.totalDeals}</p>
              </div>
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Deals by Stage */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Deals by Stage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.dealsByStage && stats.dealsByStage.length > 0 ? (
              stats.dealsByStage.map((item: any, index: number) => (
                <div key={index} className="border border-gray-100 rounded-2xl p-6 hover:border-blue-200 transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-lg text-gray-800">{item.stage}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{item.count}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Value</p>
                      <p className="font-semibold text-emerald-600">
                        ${Number(item.value || 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No deals data available yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;