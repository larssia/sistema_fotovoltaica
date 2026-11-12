const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3000
const hostname = 'localhost'

const conn = require('./db/conn')
const authMiddleware = require('./middleware/auth.middleware')
const authController = require('./controller/auth.controller')
const funcionarioController = require('./controller/funcionario.controller')
const clienteController = require('./controller/cliente.controller')
const equipamentoController = require('./controller/equipamento.controller')
const inspecaoController = require('./controller/inspecao.controller')

//----------------- Middleware --------------------

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

//----------------- Rotas Públicas --------------------

app.post('/funcionario', funcionarioController.cadastrar)
app.post('/login', authController.login)

app.get('/', (req,res)=>{
    res.status(200).json({message: 'Aplicação rodando'})
})

//----------------- Rotas Privadas --------------------

//Cliente
app.post('/cliente', clienteController.cadastrar)
app.get('/clientes', clienteController.listar)
app.get('/cliente/:id', clienteController.consultar)
app.get('/cliente/buscarNome/:nome', clienteController.consultarNome)
app.put('/cliente/:id', clienteController.atualizar)
app.delete('/cliente/:id', clienteController.apagar)

//Equipamento
app.post('/equipamento', equipamentoController.cadastrar)
app.put('/equipamento/:id', equipamentoController.atualizar)

//Inspecao
app.post('/inspecao', inspecaoController.cadastrar)
app.get('/inspecoes', inspecaoController.listar)

//----------------- Server --------------------

conn.sync()
.then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`Sistema rodando em http://${hostname}:${PORT}`)
    })
})
.catch((err)=>{
    console.error('Erro ao iniciar o servidor', err)
})