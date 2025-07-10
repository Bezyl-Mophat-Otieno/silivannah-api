const express = require('express');
const router = express.Router();
router.get('/', function(req, res, next) {
  res.status(200).json({message:`Welcome to a deployed version of the silivannah api in azure.  We're  running on port ${process.env.PORT} ${process.env.CUSTOM_PORT}`});
});

module.exports = router;
