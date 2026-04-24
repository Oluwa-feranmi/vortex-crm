const pool = require('../config/db');

const getDeals = async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT d.*, c.name as customer_name, u.username as created_by_name 
      FROM deals d 
      LEFT JOIN customers c ON d.customer_id = c.id 
      LEFT JOIN users u ON d.created_by = u.id 
      ORDER BY d.created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch deals' });
  }
};

const createDeal = async (req, res) => {
  const { title, customer_id, value, stage, close_date } = req.body;
  if (!title || !customer_id || !value) {
    return res.status(400).json({ error: 'Title, customer, and value are required' });
  }
  try {
    const [result] = await pool.execute(
      'INSERT INTO deals (title, customer_id, value, stage, close_date, created_by) VALUES (?, ?, ?, ?, ?, ?)',
      [title, customer_id, value, stage || 'Prospect', close_date, req.user.id]
    );
    res.status(201).json({ id: result.insertId, message: 'Deal created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create deal' });
  }
};

const updateDeal = async (req, res) => {
  const { title, value, stage, close_date } = req.body;
  try {
    await pool.execute(
      'UPDATE deals SET title=?, value=?, stage=?, close_date=? WHERE id=?',
      [title, value, stage, close_date, req.params.id]
    );
    res.json({ message: 'Deal updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update deal' });
  }
};

const deleteDeal = async (req, res) => {
  try {
    await pool.execute('DELETE FROM deals WHERE id = ?', [req.params.id]);
    res.json({ message: 'Deal deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete deal' });
  }
};

module.exports = { getDeals, createDeal, updateDeal, deleteDeal };