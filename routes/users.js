const express = require('express');
const router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) { 
  const me = {
    name: "Bezyl Mophat Otieno",
    userName: "Papa OJ",
    age:30,
    password: "dhsf-duih-jfh9-oejd-dkdj-8882-yehu"
  }
  res.status(200).json([me]); 
});

module.exports = router;
  