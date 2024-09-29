import express from 'express';
import Content from '../controllers/Content.js';
const router = express.Router();

router.get('/home', Content.getContent);
router.get('/create', (req, res)=>{
    res.render('home/create')
});
router.post('/createContent', Content.createContent)

export default router