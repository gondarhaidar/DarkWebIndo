import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config()
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER || 'root';
const DB_PW = process.env.DB_PW || '';
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PW, {
    dialect : 'mysql',
    host : DB_HOST,
    logging : console.log
});
try {
    await sequelize.authenticate();
    console.log('berhasil connect ke database')
} catch (error) {
    console.error(error);
}
export default sequelize;