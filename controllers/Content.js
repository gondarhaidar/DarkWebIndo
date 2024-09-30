import Content from "../models/Content.js";
import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
    destination : (req, res, cb) => {
        cb(null, 'public/media/')
    },
    filename : (req, res, cb) => {
        const uniqueName = Date.now() + 'darkwebindo'
        cb(null, uniqueName)
    }
})

const upload = multer({storage : storage})

const getContent = async (req, res) => {
    res.render('home/index')
}
const createContent = (req, res) => {
        console.log(file.filename);
        res.send(file.filename)
}
const updateContent = async (req, res) => {

}
const deleteContent = async (req, res) => {

}
const editContent = async (req, res) => {

}
export default {getContent, createContent, updateContent, deleteContent, editContent, upload}