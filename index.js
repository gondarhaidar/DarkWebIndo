import express from 'express';
import router from './route/index.js';
const app = express();
import url from 'url';
import path, { dirname } from 'path';
import expressLayouts from 'express-ejs-layouts';
import dotenv from 'dotenv';
import sequelize from './config/config.js';
import Content from './models/Content.js';
import User from './models/User.js';
dotenv.config();
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(router)
app.set('view engine', 'ejs');
app.use(expressLayouts)

// sequelize.sync({force : true})
//   .then(()=>{
//     console.log('sinkronasi berhasil')
//   })
//   .catch(err => {
//     console.log(err, 'gagal sinkron')
//   })

app.use((req, res)=>{
  res.send('error 404')
})
app.listen(process.env.DB_PORT, ()=>{
  console.log(`server running on port ${process.env.DB_PORT}`)
})