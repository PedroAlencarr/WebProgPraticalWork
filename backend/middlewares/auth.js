const protect = (req, res, next) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Não autorizado' });
    }
    next();
  };
  
module.exports = { protect };