const express = require('express');
const router = express.Router();

// Route to simulate a server error
router.get('/simulating-error', (req, res, next) => {
  const error = new Error('This is a simulated server error!');
  error.status = 500; // Set error status to 500 (Internal Server Error)
  next(error); // Pass the error to the next middleware (error handler)
});

module.exports = router;
