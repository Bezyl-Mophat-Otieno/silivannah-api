const express = require('express')
const router = express.Router()
const keyVault = require('../KeyVaultService')

router.get('/', async(_, res)=>{
    const secrets = await keyVault.listSecrets()
    if(!secrets.length){
        return res.json({message: "No secrets retrieved"}).status(404)
    }
    return res.json({message: "Secrets retrieved", secrets})

})

router.get('/find', async(req, res)=>{
    const secretName = req.query.name
    if(!secretName) return res.json({message: "Secret Name is required"}).status(400)
    const secretValue = await keyVault.getSecret(secretName)
    if(!secretValue.length){
        return res.json({message: "No secret value retrieved"}).status(404)
    }
    return res.json({message: "Secrets retrieved", secretValue})

})
router.post('/set', async(req, res)=>{
    const {key, value} = req.body
    if(!key || !value) return res.json({message: "Secret Key and Value is required"}).status(400)
    const success = await keyVault.setSecret(key, value)
    if(!success){
        return res.json({message: "Seting secret failed"}).status(404)
    }
    return res.json({message: "Secret successfully set", secretName: key, secretValue:value})

})

router.delete('/delete/:name', async(req, res)=>{
    const secretName = req.params.name
    if(!secretName) return res.json({message: "Secret Name is required"}).status(400)
    const success = await keyVault.deleteSecret(secretName)
    if(!success){
        return res.json({message: "Secret not deleted"}).status(404)
    }
    return res.json({message: "Secret deleted successfully", secretName})

})

module.exports = router