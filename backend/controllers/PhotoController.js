const Photo = require('../models/Photo.js') 
const User = require('../models/User.js') 
const mongoose = require('mongoose')

//Insere a foto com o usuário relacionado
const insertPhoto = async (req, res)=>{
    const {title} = req.body
    const image = req.file.filename 

    const reqUser = req.user
    const user = await User.findById(reqUser._id)

    //criar foto
    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName:user.name
    })

    //se foto foi criada com sucesso, retorna dados

    if (!newPhoto) {
        res.status(422).json({
            errors:["Houve um problema. tenta novamene mais tarde."]})
        return
    }
    res.status(201).json(newPhoto)
}

//Excluindo foto
const deletePhoto = async (req, res)=>{
    const {id} = req.params
    const reqUser = req.user

   try {
    
        const photo = await  Photo.findById(new mongoose.Types.ObjectId(id))
        console.log(id)
        //verifica se a foto existe
        if (!photo) {
        
            res.status(404).json({errors:["Foto não encontrada"]})
            return
        }

        //verifica se a foto pertence ao usuário
        if (!photo.userId.equals(reqUser._id)) {
            
            res.status(422).json({errors:["Houve um problema. tenta novamene mais tarde."]})
            return
        }
        
        await Photo.findByIdAndDelete(photo._id)

        res.status(201).json({id:photo.id, message: "Foto exluida com sucesso"})
   } catch (error) {
        res.status(404).json({errors:["Foto não encontrada"]})
        return
   }
}

//buscar todas as fotos
const getAllPhotos = async (req, res)=>{
    const photos = await Photo.find({}).sort([["createdAt", -1]]).exec()
    res.status(200).json(photos)
}

//buscar  as fotos do usuário
const getUserPhotos = async (req, res)=>{
    const {id} = req.params
    const photos = await Photo.find({userId:id}).sort([["createdAt", -1]]).exec()
    res.status(200).json(photos)
}

//buscar   fotos pelo id
const getPhotoById = async (req, res)=>{
    const {id} = req.params
    const photo = await  Photo.findById(new mongoose.Types.ObjectId(id))

    //verifica se a foto existe
    if (!photo) {
        res.status(404).json({errors:["Foto não encontrada"]})
        return
    }
    res.status(200).json(photo)
}

//Atualizar   foto
const updatePhoto = async (req, res)=>{
    const {id} = req.params
    const {title} = req.body
    const reqUser = req.user

    //const photo = await  Photo.findById(new mongoose.Types.ObjectId(id))
    try {
        const photo = await  Photo.findById(id)

        //verifica se a foto existe
        if (!photo) {
            res.status(404).json({errors:["Foto não encontrada"]})
            return
        }

        //verifica se a foto pertence ao usuário
        if (!photo.userId.equals(reqUser._id)) {
            res.status(422).json({errors:["Houve um problema. tenta novamene mais tarde."]})
            return
        }

        if (title) {
            photo.title = title
        }

        await photo.save()

        res.status(200).json({photo, message:"Foto atualizada com sucesso!"})
    } catch (error) {
        res.status(404).json({errors:["Foto não encontrada"]})
        return
    }
    
}

//computar likes
const likePhoto = async (req, res)=>{
    const {id} = req.params
    const reqUser = req.user
    const photo = await  Photo.findById(id)

    //verifica se a foto existe
    if (!photo) {
        res.status(404).json({errors:["Foto não encontrada"]})
        return
    }

    //verifica se o usuário já deu like na foto
    if (photo.likes.includes(reqUser.ìd)) {
        res.status(422).json({errors:["Você já curtiu essa foto."]})
        return
    }

    //coloca o id do usuário no array de likes
    photo.likes.push(reqUser._id)
    photo.save()
    res.status(200).json({photoId:id, userId:reqUser._id, message:"A foto foi curtida"})
}

//comentar foto
const commentPhoto = async (req, res)=>{
    const {id} = req.params
    const {comment} = req.body
    const reqUser = req.user

    const user = await  User.findById(reqUser._id)
    const photo = await  Photo.findById(id)

    //verifica se a foto existe
    if (!photo) {
        res.status(404).json({errors:["Foto não encontrada"]})
        return
    }

    //coloca o comentário na foto
    const userComment = {
        comment,
        userName:user.name,
        userImage:user.profileImage,
        userId:user._id
    }
    photo.comments.push(userComment)
    await photo.save()
    res.status(200).json({comment: userComment, message:"O comentário foi adicionado com sucesso!"})
}

//buscar foto pelo titulo
const searchPhoto = async (req, res)=>{
    const {q} = req.query
    const photos = await  Photo.find({title: new RegExp(q, "i")}).exec()
    res.status(200).json(photos)
    
}


module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    updatePhoto,
    likePhoto,
    commentPhoto,
    searchPhoto,
}