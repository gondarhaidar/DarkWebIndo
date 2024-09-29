import Content from "../models/Content.js";

const getContent = async (req, res) => {
    res.render('home/index')
}
const createContent = async (req, res) => {
    console.log(req.body)
    res.status(200).json({data : req.body})
}
const updateContent = async (req, res) => {

}
const deleteContent = async (req, res) => {

}
const editContent = async (req, res) => {

}
export default {getContent, createContent, updateContent, deleteContent, editContent}