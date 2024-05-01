const express = require('express')
const router = express.Router()

//controller
const {register, login} = require('../controllers/UserController.js')

//middlewares
const validate = require("../middlewares/handleValidation.js")
const {userCreateValidation, loginValidation} = require("../middlewares/userValidations.js")

//rotas
router.post('/register', userCreateValidation(), validate, register)
//rotas
router.post('/login', loginValidation(), validate, login)

module.exports = router