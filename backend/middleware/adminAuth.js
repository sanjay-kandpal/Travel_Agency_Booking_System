// 2. Update middleware/adminAuth.js
const adminAuth = (req, res, next) => {
  try {
    // Get authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: 'Authentication required',
        message: 'Please provide admin credentials'
      });
    }

    // Check if it's Basic auth
    if (!authHeader.startsWith('Basic ')) {
      return res.status(401).json({
        error: 'Invalid authentication method',
        message: 'Basic authentication required'
      });
    }

    // Get and decode credentials
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    // Check credentials against environment variables
    const validUsername = process.env.ADMIN_USERNAME || 'admin';
    const validPassword = process.env.ADMIN_PASSWORD || 'adminpass';

    if (username === validUsername && password === validPassword) {
      next();
    } else {
      res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid admin credentials'
      });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Server error',
      message: 'An error occurred during authentication'
    });
  }
};

module.exports = adminAuth;