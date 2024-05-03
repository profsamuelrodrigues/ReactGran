const express = require('express')
const router = express.Router()

//controller
const {insertPhoto, deletePhoto, getAllPhotos, getUserPhotos, getPhotoById, updatePhoto, likePhoto, commentPhoto, searchPhoto} = require('../controllers/PhotoController.js')

//middlewares
const validate = require("../middlewares/handleValidation.js")
const {photoInsertValidation, photoUpdateValidation, photoCommentValidation} = require("../middlewares/photoValidations.js")
const authGuard = require("../middlewares/authGuard.js")
const { imageUpload } = require('../middlewares/imageUpload.js') 

//rotas
router.post('/', authGuard, imageUpload.single("image"), photoInsertValidation(), validate,  insertPhoto)
router.delete('/:id', authGuard, deletePhoto)
router.get('/', authGuard, getAllPhotos)
router.get('/user/:id', authGuard, getUserPhotos)
router.get('/search', authGuard, searchPhoto)
router.get('/:id', authGuard, getPhotoById)
router.put('/:id', authGuard, photoUpdateValidation(), validate, updatePhoto)
router.put('/like/:id', authGuard, likePhoto)
router.put('/comment/:id', authGuard, photoCommentValidation(), validate, commentPhoto)




module.exports = router