import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Deals from './pages/Deals';
import Tasks from './pages/Tasks';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Simple Navigation Bar */}
        <nav className="bg-white shadow-sm border-b px-8 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl">V</div>
              <h1 className="text-2xl font-semibold">VortexCRM</h1>
            </div>
            <div className="flex gap-8 text-sm font-medium">
              <Link to="/" className="hover:text-blue-600">Dashboard</Link>
              <Link to="/customers" className="hover:text-blue-600">Customers</Link>
              <Link to="/deals" className="hover:text-blue-600">Deals</Link>
              <Link to="/tasks" className="hover:text-blue-600">Tasks</Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;