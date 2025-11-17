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
        type: DataTypes.TEXT,
        allowNull: false

    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    duration: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    img_path: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize: sequelize, timestamps: false })

export default Release
