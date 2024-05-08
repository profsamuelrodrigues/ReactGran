require("dotenv").config()

const express = require("express")
const path = require("path")
const cors = require("cors")


const port = process.env.PORT

const app = express()

//Configurar resposta em json e form data
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//resolver prblemas de cors
app.use(cors({credentials:true, origin:"http://localhost:3000"}))

//pasta de upload de imagens
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))


//rotas
const router = require("./routes/Router.js")
app.use(router)

//Conexão com o banco de dados
require("./config/db.js")



app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`)
})