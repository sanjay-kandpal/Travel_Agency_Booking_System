// middleware/adminAuth.js
module.exports = (req, res, next) => {
    const { username, password } = req.headers;
    
    if (
      username === process.env.ADMIN_USERNAME && 
      password === process.env.ADMIN_PASSWORD
    ) {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  };