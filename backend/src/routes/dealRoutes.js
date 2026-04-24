const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { getDeals, createDeal, updateDeal, deleteDeal } = require('../controllers/dealController');

router.get('/', authenticateToken, getDeals);
router.post('/', authenticateToken, createDeal);
router.put('/:id', authenticateToken, updateDeal);
router.delete('/:id', authenticateToken, deleteDeal);

module.exports = router;