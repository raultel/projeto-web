import { Model, DataTypes } from 'sequelize'
import sequelize from '../dbconfig.js'

class Release extends Model { }

Release.init({
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
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, { sequelize: sequelize, timestamps: false })

export default Release
