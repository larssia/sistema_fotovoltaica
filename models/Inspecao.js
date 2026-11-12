const { DataTypes} = require('sequelize')
const db = require('../db/conn')

const Inspecao = db.define('Inspecao', {
    codInspecao: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    idEquipamento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'equipamentos',
            key: 'codEquipamento'
        }
    },
    status: {
        type: DataTypes.ENUM('PENDENTE', 'REALIZADA'),
        allowNull: false
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'inspecoes'
})

module.exports = Inspecao