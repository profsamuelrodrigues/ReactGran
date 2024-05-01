const express = require('express')
const router = express.Router()

//controller
const {register} = require('../controllers/UserController.js')

//middlewares
const validate = require("../middlewares/handleValidation.js")
const {userCreateValidation} = require("../middlewares/userValidations.js")

//rotas
router.post('/register', userCreateValidation(), validate, register)

module.exports = router