const express = require('express')
const router = express()

router.use('/users', require('./UserRoutes.js'))
router.use('/photos', require('./PhotoRoutes.js'))

//rota de teste
router.get("/", (req, res)=>{
    res.send("Bem vindo!")
})

module.exports = router