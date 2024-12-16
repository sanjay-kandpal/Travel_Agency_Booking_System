// middleware/adminAuth.js
const adminAuth = (req, res, next) => {
  try {
    // Get authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: 'Authentication required'
      });
    }

    // Check if it's Basic auth
    if (!authHeader.startsWith('Basic ')) {
      return res.status(401).json({
        error: 'Invalid authentication method'
      });
    }

    // Get and decode credentials
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    // Hardcoded credentials
    if (username === 'admin' && password === 'admin123') {
      next();
    } else {
      res.status(401).json({
        error: 'Invalid credentials'
      });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Server error'
    });
  }
};

module.exports = adminAuth;