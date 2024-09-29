import sequelize from "../config/config.js";
import { DataTypes } from "sequelize";

const User = sequelize.define('User', {
    nama : {
        type : DataTypes.STRING,
        unique : false,
        allowNull : false
    },
    email : {
        unique : true,
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            isEmail : true
        }
    },
    password : {
        type : DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps : true,
    tableName : 'users'
});
export default User