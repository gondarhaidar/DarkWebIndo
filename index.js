const express = require('express')
const app = express()
const port = 3000
const expressLayouts = require('express-ejs-layouts')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/media/');  // Path relatif untuk folder 'uploads'
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);  // Gunakan nama asli file
    }
  });
  
  // Inisialisasi multer dengan konfigurasi storage
  const upload = multer({ storage: storage });
  
  // Membuat folder 'uploads' dapat diakses secara publik
  app.use('/public', express.static('public'));
  app.set('view engine', 'ejs')
  app.use(expressLayouts)

  // Rute untuk mengunggah file
  app.post('/api/upload', (req, res, next) => {
    upload.single('file')(req, res, (err) => {
      if (err) {
        res.send('error')
      }
      res.json(req.file);
    });
  });
  
app.get('/', (req, res)=>{
  res.render('home', {
    layout : 'layouts'
  })
})
app.use((req, res)=>{
  res.status(404);
  res.send('<div style=position: absolute, top: 0;bottom: 0;left: 0;right:0;background-color:red;><h1>ERROR TAI</h1></div>')
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})