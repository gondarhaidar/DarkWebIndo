import Content from "../models/Content.js";
import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
    destination : (req, res, cb) => {
        cb(null, 'public/media/')
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + path.extname(file.originalname)
        cb(null, uniqueName);  // Gunakan nama asli file
    }
})

const upload = multer({storage : storage})

const getContent = async (req, res) => {
    res.render('home/index', {
        title : 'darkwebindo'
    })
}
const createContent = (req, res) => {
    const file = req.file
        console.log(file.filename);
        res.send(path.extname(file.filename))
}
const updateContent = async (req, res) => {

}
const deleteContent = async (req, res) => {

}
const editContent = async (req, res) => {

}
export default {getContent, createContent, updateContent, deleteContent, editContent, upload}