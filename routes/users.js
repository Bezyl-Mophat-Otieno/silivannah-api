const express = require('express');
const router = express.Router();
/* GET users listing. */
router.get('/health', function(req, res, next) { 
  res.status(200).json([{userName: 'Bezyl  Mophat Otieno'}]); 
});

module.exports = router;
  