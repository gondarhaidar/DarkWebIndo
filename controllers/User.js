import User from "../models/User.js";
import bcrypt from 'bcrypt';

const userRegister = async (req, res) =>{
    try {
        const {nama, email, password} = req.body;
        const findEmail = await User.findOne({where : {email : email}})
        if(findEmail){
            return res.status(404).send('email sudah terdaftar');
        }
        const hashPass = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            nama : nama,
            email: email,
            password : hashPass
        })
        res.status(201).send('register user berhasil')
    } catch (error) {
        return res.status(500).send('error 500')
    }
}

const userAuthenticate = async (req, res) => {
    try{
        const {email, password} = req.body
        const findEmail = await User.findOne({where : {email: email}});
        if(findEmail){
            const hashPass = await bcrypt.compare(password, findEmail.password);
            if(hashPass){
                req.session.user = {
                    id : findEmail.id,
                    email : findEmail.email
                }
                return res.redirect('/admin/create')
            }
        }
        return res.status(400).send('Email || password salah')
    }catch(err){
        res.status(500).send('terjadi kesalahan' + err)
    }
}


const logoutUser =  (req, res) => {
    req.session.destroy(err => {
        if(err){
            return res.status(500).send('gagal logout')
        }
        res.redirect('/login')
    })
}

export default {userRegister, userAuthenticate, logoutUser}