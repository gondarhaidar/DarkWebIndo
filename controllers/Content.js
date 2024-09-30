import Content from "../models/Content.js";
import multer from "multer";

const storage = multer.diskStorage({
    destination : (req, res, cb) => {
        cb(null, './public/media')
    }
})

const getContent = async (req, res) => {
    res.render('home/index')
}
const createContent = (req, res) => {
    console.log(req.body.file)
    res.status(200).json({data : req.body.file})
}
const updateContent = async (req, res) => {

}
const deleteContent = async (req, res) => {

}
const editContent = async (req, res) => {

}
export default {getContent, createContent, updateContent, deleteContent, editContent}