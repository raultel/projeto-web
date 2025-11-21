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
    subtitle: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    youtube: {
        type: DataTypes.STRING,
        allowNull: true
    },
    soundcloud: {
        type: DataTypes.STRING,
        allowNull: true
    },
    spotify: {
        type: DataTypes.STRING,
        allowNull: true
    },
    bandcamp: {
        type: DataTypes.STRING,
        allowNull: true
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
        type: DataTypes.STRING,
        allowNull: false
    },
    img_path: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize: sequelize, timestamps: false })

export default Release
