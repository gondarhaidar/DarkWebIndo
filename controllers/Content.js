import Content from "../models/Content.js";
import multer from "multer";
import path from 'path';
import { title } from "process";
import { Op } from "sequelize";
// import { title } from "process";

const storage = multer.diskStorage({
    destination : (req, res, cb) => {
        cb(null, 'public/media/')
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + path.extname(file.originalname)
        cb(null, uniqueName); 
    }
})

const upload = multer({storage : storage})

const getContent = async (req, res) => {
    try {
        const contents = await Content.findAll();
        res.render('home/index', {
            layout : 'layouts/index',
            title : 'DarkWebIndo',
            contents : contents,
            user : req.session.user
        });
    } catch (err) {
        res.status(500).send("<h1>Error Database </h1>")
    }
}

const showContent = async(req, res) =>{
    try{
        const slug = req.params.slug;
        const content = await Content.findOne({where : {slug: slug}});
        let view = content.views;
        await content.update({
            views : view + 1
        })
        res.status(200).render('home/show', {
            title : content.judul,
            layout : 'layouts/index',
            content
        });
    }catch(err){
        console.log(err)
        res.status(400).json({msg : "database error", err});
    }
}

const searchContent = async(req, res)=>{
    try{
        const q = req.query.q;
        const contents = await Content.findAll({
            where : {
                [Op.or] : {
                    judul : {[Op.like]: `%${q}%`},
                    desc : {[Op.like]: `%${q}%`}
                }
            }
        });
        res.render('home/search', {
            layout : 'layouts/index',
            title : q,
            contents
        })
    }catch(err){
        console.log(err)
        res.status(400).json({err, msg : "database error"})
    }
}

const adminDashboard = async (req, res) =>{
    res.render('admin/index', {
        title : 'dashboard'
    })
}



const createContent = async (req, res) => {
    try {
        const file = req.file
        const fileExt = path.extname(file.originalname);

        if (fileExt !== '.mp4' && fileExt !== '.mp3') {
            return res.send('format file tidak valid');
        }

        await Content.create({
            judul : req.body.judul, 
            slug :req.body.slug, 
            desc : req.body.desc, 
            file_name : file.filename,
            backup_link : req.body.backup_link,
            views : 0
        })

        res.status(201).json({msg : 'berhasil diupload'})
    } catch (err) {
        console.error(err)
        res.status(500).json({err, msg : 'error 500'})
    }
}
const updateContent = async (req, res) => {

}
const deleteContent = async (req, res) => {

}
const editContent = async (req, res) => {

}
export default {getContent, createContent, updateContent, deleteContent, editContent, upload, adminDashboard, showContent, searchContent}