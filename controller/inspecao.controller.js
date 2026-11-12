const Equipamento = require('../models/Equipamento')
const Inspecao = require('../models/Inspecao')

const cadastrar = async(req,res)=>{
    const valores = req.body
    console.log(valores)

    if(!valores.idEquipamento || !valores.status || !valores.data || !valores.hora){
        return res.status(400).json({message: 'Todos os campos são obrigatórios'})
    }

    try{
        const equipamento = await Equipamento.findByPk(valores.idEquipamento)
        if(!equipamento){
            return res.status(404).json({message: 'Dados não encontrados'})
        }

        await Inspecao.create(valores)
        return res.status(201).json({message: 'Dados cadastrados com sucesso!'})
    }catch(err){
        return res.status(500).json({message: 'Erro ao cadastrar dados'})
    }
}

const listar = async(req,res)=>{
    try{
        const inspecao = await Inspecao.findAll({
            order: [['data', 'ASC']],
            include: [
                {
                    model: Equipamento,
                    as: 'inspecaoEquipamento',
                    attributes: ['codEquipamento','idCliente', 'modelo', 'fabricante']
                }
            ]
        })

        return res.status(200).json(inspecao)
    }catch(err){
        return res.status(500).json({message: 'Erro ao atualizar dados'})
    }
}

module.exports = {cadastrar, listar}