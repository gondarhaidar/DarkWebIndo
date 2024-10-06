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
import session from "express-session";
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import fs from 'fs';
dotenv.config();
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const publicMedia = path.join(__dirname, 'public/media');
if(!fs.existsSync('public/media')){
  fs.mkdirSync(publicMedia, {recursive : true});
  console.log('Direktori public/media berhasil dibuat')
}
app.use(cookieParser());

app.use(session({
  secret : process.env.SECRET,
  resave : false,
  saveUninitialized : true,
  cookie : {secure : false}
}));
app.use(flash());
app.use((req, res, next)=>{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
})
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.set('view engine', 'ejs');
app.use(expressLayouts)
app.use(router)

sequelize.sync({force : false})
  .then(()=>{
    console.log('sinkronasi berhasil')
  })
  .catch(err => {
    console.log(err, 'gagal sinkron')
  })
app.use((req, res)=>{
  res.send('error 404')
})
app.listen(process.env.DB_PORT, ()=>{
  console.log(`server running on port ${process.env.DB_PORT}`)
})