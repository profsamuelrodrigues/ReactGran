const express = require('express')
const router = express()

router.use('/users', require('./UserRoutes.js'))

//rota de teste
router.get("/", (req, res)=>{
    res.send("Bem vindo!")
})

module.exports = router