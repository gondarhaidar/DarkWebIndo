const userAuthenticate = (req, res, next) =>{
    if(req.session.user){
        return next()
    }
    req.flash('error_msg', 'silahkan login terlebih dahulu');
    res.redirect('/login');
}
const guestUser = (req, res, next)=>{
    if(!req.session.user){
        return next()
    }
    req.flash('error_msg', 'anda sudah login');
    res.redirect('/admin/create')
}
export default {userAuthenticate, guestUser}