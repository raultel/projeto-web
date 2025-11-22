import { Model, DataTypes } from 'sequelize'
import sequelize from '../dbconfig.js'

class Character extends Model { }

Character.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false

    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    aliases: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true

    },
    species: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    origin: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    gender: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    img_path: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize: sequelize, timestamps: false })

export default Character
