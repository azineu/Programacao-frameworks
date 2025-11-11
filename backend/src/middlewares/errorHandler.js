export default (err, req, res, _next) => {
  console.error(err);

  return res.status(500).json({ 
    error: 'Internal server error', 
    message: err.message 
  });
};
