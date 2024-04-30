require("dotenv").config()

const express = require("express")
const path = require("path")
const cors = require("cors")


const port = process.env.PORT

const app = express()

//Configurar resposta em json e form data
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//rotas
const router = require("./routes/Router.js")
app.use(router)

//rota de teste
router.get("/", (req, res)=>{
    res.send("Bem vindo!")
})

app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`)
})