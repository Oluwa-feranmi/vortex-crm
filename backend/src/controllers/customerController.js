const pool = require('../config/db');

const getCustomers = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM customers ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM customers WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Customer not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const createCustomer = async (req, res) => {
  const { name, email, phone, company } = req.body;
  try {
    const [result] = await pool.execute(
      'INSERT INTO customers (name, email, phone, company) VALUES (?, ?, ?, ?)',
      [name, email, phone, company]
    );
    res.status(201).json({ id: result.insertId, message: 'Customer created' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create customer' });
  }
};

const updateCustomer = async (req, res) => {
  const { name, email, phone, company, status } = req.body;
  try {
    await pool.execute(
      'UPDATE customers SET name=?, email=?, phone=?, company=?, status=? WHERE id=?',
      [name, email, phone, company, status, req.params.id]
    );
    res.json({ message: 'Customer updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update customer' });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    await pool.execute('DELETE FROM customers WHERE id = ?', [req.params.id]);
    res.json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete customer' });
  }
};

module.exports = { getCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer };