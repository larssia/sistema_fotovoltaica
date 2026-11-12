const { DataTypes} = require('sequelize')
const db = require('../db/conn')

const Equipamento = db.define('Equipamento', {
    codEquipamento: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    idCliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'clientes',
            key: 'codCliente'
        }
    },
    modelo: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    fabricante: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    numSerie: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'equipamentos'
})

module.exports = Equipamento