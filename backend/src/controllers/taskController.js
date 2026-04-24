const pool = require('../config/db');

const getTasks = async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT t.*, c.name as customer_name, d.title as deal_title, u.username as assigned_to_name 
      FROM tasks t 
      LEFT JOIN customers c ON t.customer_id = c.id 
      LEFT JOIN deals d ON t.deal_id = d.id 
      LEFT JOIN users u ON t.assigned_to = u.id 
      ORDER BY t.due_date ASC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

const createTask = async (req, res) => {
  const { title, description, customer_id, deal_id, assigned_to, due_date } = req.body;
  try {
    const [result] = await pool.execute(
      'INSERT INTO tasks (title, description, customer_id, deal_id, assigned_to, due_date, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, description, customer_id, deal_id, assigned_to, due_date, req.user.id]
    );
    res.status(201).json({ id: result.insertId, message: 'Task created' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

const updateTask = async (req, res) => {
  const { status } = req.body;
  try {
    await pool.execute('UPDATE tasks SET status=? WHERE id=?', [status, req.params.id]);
    res.json({ message: 'Task updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

module.exports = { getTasks, createTask, updateTask };