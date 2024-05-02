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
            errors:["Houve um problema. tenta novamene mais tarde."]
        })
    }
    res.status(201).json(newPhoto)
}

module.exports = {
    insertPhoto,
}