const express = require('express');
const router = express.Router();
router.get('/', function(req, res, next) {
  res.status(200).json({message: 'Welcome to azure api'});
});

module.exports = router;
