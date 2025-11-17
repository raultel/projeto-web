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
        type: DataTypes.TEXT,
        allowNull: false

    },
    date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    img_path: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize: sequelize, timestamps: false })

export default Illustration
