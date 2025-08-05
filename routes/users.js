const express = require('express');
const { KeyVaultService } = require('../KeyVaultService');
const router = express.Router();
/* GET users listing. */
router.get('/', async function(req, res, next) { 
  const keyVault = new KeyVaultService(process.env.KEYVAULT_URL)
  const secrets = await keyVault.listSecrets()
  const me = {
    name: "Bezyl Mophat Otieno",
    userName: "Papa OJ",
    age:30,
    password: "dhsf-duih-jfh9-oejd-dkdj-8882-yehu"
  }
  res.status(200).json({users: [me], secrets}); 
});

module.exports = router;
  