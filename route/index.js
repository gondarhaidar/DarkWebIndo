import express from 'express';
import Content from '../controllers/Content.js';
import User from '../controllers/User.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/', (req, res)=>{
    res.redirect('/home')
})
router.get('/home', Content.getContent);
// router.get('/home/:slug', Content.showContent);
router.get('/admin', auth.userAuthenticate, Content.adminDashboard);
// router.get('/admin/edit/:slug', Content.adminEdit);

/****************************   crud content    ************/
router.get('/admin/create', auth.userAuthenticate,(req, res)=>{
    res.render('admin/create')
})
router.post('/adminCreate', Content.upload.single('file') ,Content.createContent);


/*********      Login & Register Route     ***********/
router.get('/register', auth.guestUser, (req, res)=>{
    res.render('admin/register');
});
router.get('/login', auth.guestUser, (req, res)=>{
    res.render('admin/login')
});
router.post('/register',auth.guestUser, User.userRegister);
router.post('/login', auth.guestUser, User.userAuthenticate);
export default router
/**************                        ***********/