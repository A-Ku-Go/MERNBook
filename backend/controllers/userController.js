exports.getProfile = (req, res) => {
  // req.user is set by authMiddleware
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  res.json(req.user);
};