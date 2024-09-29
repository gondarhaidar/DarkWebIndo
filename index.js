import express from 'express';
import router from './route/index.js';
const app = express();
import url from 'url';
import path, { dirname } from 'path';
import expressLayouts from 'express-ejs-layouts';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(router)
app.use(express.json())
app.set('view engine', 'ejs');
app.use(expressLayouts)

app.use((req, res)=>{
  res.send('error 404')
})
app.listen(3000)