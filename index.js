const express = require('express')
const app = express()
const port = 3000
const expressLayouts = require('express-ejs-layouts')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'videos/');  // Path relatif untuk folder 'uploads'
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);  // Gunakan nama asli file
    }
  });
  
  // Inisialisasi multer dengan konfigurasi storage
  const upload = multer({ storage: storage });
  
  // Membuat folder 'uploads' dapat diakses secara publik
  app.use('/uploads', express.static('uploads'));
  app.set('view engine', 'ejs')
  app.use(expressLayouts)

  // Rute untuk mengunggah file
  app.post('/darkwebindo/api/upload', (req, res, next) => {
    upload.single('file')(req, res, (err) => {
      if (err) {
        res.send('error')
      }
      res.json(req.file);
    });
  });
  
app.get('/darkwebindo', (req, res)=>{
  res.render('home', {
    layout : 'layouts'
  })
})
app.use((req, res)=>{
  res.status(404);
  res.send('<h1>error tai</h1>')
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})