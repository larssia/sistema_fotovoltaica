const Cliente = require('../models/Cliente')

const CryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'nuvem'

const cadastrar = async(req,res)=>{
    const valores = req.body
    console.log(valores)

    if(!valores.nome || !valores.cpf || !valores.telefone){
        return res.status(400).json({message: 'Todos os campos são obrigatórios'})
    }

    if(valores.cpf.length !== 11){
        return res.status(400).json({message: 'CPF inválido'})
    }

    try{
        const cpfCripto = CryptoJs.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()

        await Cliente.create({
            nome: valores.nome,
            cpf: cpfCripto,
            telefone: valores.telefone
        })
        return res.status(201).json({message: 'Dados cadastrados com sucesso!'})
    }catch(err){
        return res.status(500).json({message: 'Erro ao cadastrar dados'})
    }
}

const listar = async(req,res)=>{
    try{
        const cliente = await Cliente.findAll()
        let resultado = []

        resultado.forEach((el)=>{
            let cpfDescripto = ''
            try{
                const bytes = CryptoJs.AES.decrypt(el.cpf, CHAVE_SECRETA)
                cpfDescripto = bytes.toString(CryptoJs.enc.Utf8)
            }catch(err){
                return res.status(500).json({message: 'Erro ao descriptografar'})
            }
            resultado.push({
                codCliente: el.codCliente,
                nome: el.nome,
                cpf: cpfDescripto,
                telefone: el.telefone
            })
        })

        return res.status(200).json(resultado)
    }catch(err){
        return res.status(500).json({message: 'Erro ao listar dados'})
    }
}

const consultar = async(req,res)=>{
    const id = req.params.id
    console.log(id)

    try{
        const cliente = await Cliente.findByPk(id)
        if(!cliente){
            return res.status(404).json({message: 'Dados não encontrados'})
        }

        const bytes = CryptoJs.AES.decrypt(cliente.cpf, CHAVE_SECRETA)
        const cpfDescripto = bytes.toString(CryptoJs.enc.Utf8)

        return res.status(200).json({
            codCliente: cliente.codCliente,
            nome: cliente.nome,
            cpf: cpfDescripto,
            telefone: cliente.telefone
        })
    }catch(err){
        return res.status(500).json({message: 'Erro ao consultar dados'})
    }
}

const consultarNome = async(req,res)=>{
    const nome = req.params.id
    console.log(nome)

    try{
        const cliente = await Cliente.findOne({where: {nome: nome}})
        if(!cliente){
            return res.status(404).json({message: 'Dados não encontrados'})
        }

        const bytes = CryptoJs.AES.decrypt(el.cpf, CHAVE_SECRETA)
        const cpfDescripto = bytes.toString(CryptoJs.enc.Utf8)

        return res.status(200).json({
            codCliente: cliente.codCliente,
            nome: cliente.nome,
            cpf: cpfDescripto,
            telefone: cliente.telefone
        })
    }catch(err){
        return res.status(500).json({message: 'Erro ao consultar dados'})
    }
}

const atualizar = async(req,res)=>{
    const id = req.params.id
    const valores = req.body
    console.log(id)
    console.log(valores)

    try{
        const cliente = await Cliente.findOne({where: {nome: nome}})
        if(!cliente){
            return res.status(404).json({message: 'Dados não encontrados'})
        }

        let dadosDescripto = ''

        if(!valores.cpf){
            if(valores.cpf.length !== 11){
                return res.status(404).json({message: 'CPF inválido'})
            }
            dadosDescripto.cpf = CryptoJs.AES.encrypt(cliente.cpf, CHAVE_SECRETA).toString()
        }

        await Cliente.update(dadosDescripto, {where: {codCliente: id}})
        return res.status(200).json({message: 'Dados atualizado com sucesso'})
    }catch(err){
        return res.status(500).json({message: 'Erro ao atualizar dados'})
    }
}

const apagar = async(req,res)=>{
    const id = req.params.id
    const valores = req.body
    console.log(id)
    console.log(valores)

    try{
        const cliente = await Cliente.findOne({where: {nome: nome}})
        if(!cliente){
            return res.status(404).json({message: 'Dados não encontrados'})
        }

        await Cliente.destroy(valores, {where: {codCliente: id}})
        return res.status(200).json({message: 'Dados atualizado com sucesso'})
    }catch(err){
        return res.status(500).json({message: 'Erro ao apagar dados'})
    }
}

module.exports = {cadastrar, listar, consultar, consultarNome, atualizar, apagar}