const sequelize = require("../config/config.js");
const { DataTypes } = require("sequelize");
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
    backup_link : {
        type : DataTypes.STRING
    },
    views : {
        type : DataTypes.INTEGER
    }
}, {
    timestamps : true,
    tableName : 'contents'
})
module.exports = Content