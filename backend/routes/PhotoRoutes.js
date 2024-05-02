const express = require('express')
const router = express.Router()

//controller
const {insertPhoto} = require('../controllers/PhotoController.js')

//middlewares
const validate = require("../middlewares/handleValidation.js")
const {photoInsertValidation} = require("../middlewares/photoValidations.js")
const authGuard = require("../middlewares/authGuard.js")
const { imageUpload } = require('../middlewares/imageUpload.js')

//rotas
router.post('/', authGuard, imageUpload.single("image"), photoInsertValidation(), validate,  insertPhoto)


module.exports = router