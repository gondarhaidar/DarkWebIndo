const express = require('express');
const router = require('./route/index.js');
const app = express();
const url = require('url');
const path = { dirname } = require('path');
const expressLayouts = require('express-ejs-layouts');
const dotenv = require('dotenv');
const sequelize = require('./config/config.js');
const Content = require('./models/Content.js');
const User = require('./models/User.js');
const session = require("express-session");
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const fs = require('fs');
dotenv.config();
// const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const publicMedia = path.join(__dirname, 'public/media');
if(!fs.existsSync('public/media')){
  fs.mkdirSync(publicMedia, {recursive : true});
  console.log('Direktori public/media berhasil dibuat')
}
app.use(cookieParser());

app.use(session({
  secret : 'ujshfuiyr8SDGASDRGAEJ/tjgweTWE?GJweGVejfawWR?U2YRFGWjtgaPasjkf:iHIw',
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
app.listen(3000, ()=>{
  console.log(`server running on port ${3000}`)
})

// DB_NAME = gondarwe_darkweb
// DB_HOST = localhost
// DB_USER = gondarwe_usertes
// DB_PW = gondar1919
// SECRET = akjhfuiweweyr7wrui3whrnRGTRDGJTweqDFSDGJGSDGSTGwert5Wr52352%$RrfERtyyQTYGREHREHRAEHraehERAYHYHYHERHHHERATWEWEJAFAADFHeWEAAQWTWE$