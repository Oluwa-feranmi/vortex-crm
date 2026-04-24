const pool = require('../config/db');

const getDashboardStats = async (req, res) => {
  try {
    const [totalCustomers] = await pool.execute('SELECT COUNT(*) as count FROM customers');
    const [totalDeals] = await pool.execute('SELECT COUNT(*) as count FROM deals');
    const [pipelineValue] = await pool.execute(`
      SELECT SUM(value) as total FROM deals WHERE stage NOT IN ('Closed-Lost', 'Closed-Won')
    `);
    const [tasksPending] = await pool.execute(`
      SELECT COUNT(*) as count FROM tasks WHERE status = 'Pending'
    `);

    const [dealsByStage] = await pool.execute(`
      SELECT stage, COUNT(*) as count, SUM(value) as value 
      FROM deals GROUP BY stage
    `);

    res.json({
      totalCustomers: totalCustomers[0].count,
      totalDeals: totalDeals[0].count,
      pipelineValue: pipelineValue[0].total || 0,
      tasksPending: tasksPending[0].count,
      dealsByStage
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
};

module.exports = { getDashboardStats };