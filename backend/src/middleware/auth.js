// Temporary: No authentication for practice
const authenticateToken = (req, res, next) => {
  next();   // Allow all requests
};

const authorizeAdmin = (req, res, next) => {
  next();   // Allow all requests
};

module.exports = { authenticateToken, authorizeAdmin };