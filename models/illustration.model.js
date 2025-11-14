import { Model, DataTypes } from 'sequelize'
import sequelize from '../dbconfig.js'

class Illustration extends Model { }

Illustration.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false

    },
    description: {
        type: DataTypes.STRING,
        allowNull: true

    },
    path: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, { sequelize: sequelize, timestamps: false })

export default Illustration
