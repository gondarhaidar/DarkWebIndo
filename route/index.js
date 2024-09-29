import express from 'express';
const router = express.Router();

router.get('/home', (req, res)=>{
    res.render('home/index')
})

export default router