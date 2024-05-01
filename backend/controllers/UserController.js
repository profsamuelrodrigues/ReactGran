const User = require('../models/User.js') 
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const jwtSecret = process.env.JWT_SECRET

//gera token do usuário
const generateToken = (id)=>{
    return jwt.sign(
    {id}, 
    jwtSecret, 
    {expiresIn:'7d'}
    )
}

// registra um usuário
const register = async (req, res)=>{
    const {name, email, password} = req.body

    //verifica se o usuário já existe no sistema
    const user = await User.findOne({email})

    if (user) {  
         res.status(422).json({errors:['Email já cadastrado']})
         return
    }

    //gera senha hash
    const salt = await bcrypt.genSalt()

    const passwordHash = await bcrypt.hash(password, salt)
    
    //cria um usuário
    const newUser = await User.create({
         name,
         email,
         password: passwordHash
    }) 

    //cerifica se o usuáriofoi criado com sucesso e retorna o token 
    if (!newUser) {
         res.status(422).json({errors:['Erro inesperado. Favor tentar novamnete.']})
         return
    }

    res.status(201).json({
         _id: newUser._id,
         token: generateToken(newUser._id)
    })
}

 //loga o usuário no sistema
 const  login = async(req, res)=>{
     const {email, password} = req.body

     const user = await User.findOne({email})

     //verifica se o usuário existe
     if (!user) {
          res.status(404).json({errors:['Usuário não encontrado.']})
          return
     }

     //verifica as senhas
     if (!(await bcrypt.compare(password, user.password))) {
          res.status(422).json({errors:['Senha inválida.']})
          return
     }

     //retorna o usuário com o token
     res.status(201).json({
          _id: user._id,
          //profieImage: user.profileImage,
          token: generateToken(user._id)
     })
}

module.exports = {
    register,
    login,

}