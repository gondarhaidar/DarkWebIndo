import sequelize from "../config/config.js";
import { DataTypes } from "sequelize";
const Content = sequelize.define('Content', {
    judul : {
        type : DataTypes.STRING,
        allowNull : false
    },
    slug : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    desc : {
        type : DataTypes.STRING,
        allowNull : true
    },
    file_name : {
        type : DataTypes.STRING,
        allowNull : false
    },
}, {
    timestamps : true,
    tableName : 'contents'
})
export default Content