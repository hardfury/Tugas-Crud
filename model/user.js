import { Sequelize } from "sequelize";
import db from "../config/database.js"

const { DataTypes } = Sequelize;

const User = db.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user'
    }
}, {
    freezeTableName: true
})

export default User;

(async()=> {
    await db.sync();
})();