const express = require('express');
const router = express.Router();

// No login/register needed for now
router.get('/health', (req, res) => res.json({ status: 'ok' }));

module.exports = router;