import express from 'express';
import Content from '../controllers/Content.js';
import User from '../controllers/User.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/', (req, res)=>{
    res.redirect('/home')
})
router.get('/home', Content.getContent);
router.get('show/:slug', Content.showContent);
router.get('/admin', auth.userAuthenticate, Content.adminDashboard);
router.get('/home/search', Content.searchContent)
// router.get('/admin/edit/:slug', Content.adminEdit);

/****************************   crud content    ************/
router.get('/admin/create', auth.userAuthenticate,(req, res)=>{
    res.render('admin/create', {layout : false})
})
router.post('/adminCreate', Content.upload.single('file') ,Content.createContent);


/*********      Login & Register Route     ***********/
router.get('/register', auth.guestUser, (req, res)=>{
    res.render('admin/register', {layout: false});
});
router.get('/login', auth.guestUser, (req, res)=>{
    res.render('admin/login', {layout : false})
});
router.post('/register',auth.guestUser, User.userRegister);
router.post('/login', auth.guestUser, User.userAuthenticate);
export default router
/**************                        ***********/