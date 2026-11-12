const Equipamento = require('../models/Equipamento')
const Cliente = require('../models/Cliente')

const CryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'nuvem'

const cadastrar = async(req,res)=>{
    const valores = req.body
    console.log(valores)

    if(!valores.idCliente || !valores.modelo || !valores.fabricante || !valores.numSerie){
        return res.status(400).json({message: 'Todos os campos são obrigatórios'})
    }

    try{
        const cliente = await Cliente.findByPk(valores.idCliente)
        if(!cliente){
            return res.status(404).json({message: 'Dados não encontrados'})
        }

        const numSerieCripto = CryptoJs.AES.encrypt(valores.numSerie, CHAVE_SECRETA).toString()

        await Equipamento.create({
            idCliente: valores.idCliente,
            modelo: valores.modelo,
            fabricante: valores.fabricante,
            numSerie: numSerieCripto
        })
        return res.status(201).json({message: 'Dados cadastrados com sucesso!'})
    }catch(err){
        return res.status(500).json({message: 'Erro ao cadastrar dados'})
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

        const equipamento = await Equipamento.findByPk()
        if(!equipamento){
            return res.status(404).json({message: 'Dados não encontrados'})
        }

        let dadosDescripto = ''

        if(!valores.numSerie){
            dadosDescripto.numSerie = CryptoJs.AES.encrypt(cliente.numSerie, CHAVE_SECRETA).toString()
        }

        await Equipamento.update(dadosDescripto, {where: {codCliente: id}})
        return res.status(200).json({message: 'Dados atualizado com sucesso'})
    }catch(err){
        return res.status(500).json({message: 'Erro ao atualizar dados'})
    }
}

module.exports = {cadastrar, atualizar}