const express = require('express')
const router = express.Router()

//controller
const {register} = require('../controllers/UserController.js')

//rotas
router.post('/register', register)

module.exports = router