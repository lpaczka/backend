const mongoose = require('mongoose')
const URL_MONGO = "mongodb://lpaczka:Hola12@ds225038.mlab.com:25038/proyectofinal"
// const URL_MONGO = "mongodb://localhost:27017/proyectofinalprueba"

mongoose.connect(URL_MONGO, {useNewUrlParser:true}, err => {
    if(!err) console.log('Conexion exitosa')
})

const Schema = mongoose.Schema
const userSchema = new Schema({
    name: {
        type: String},
    nickname: {
        type: String,
        index: true,
        unique: true},
    image: String
},{timestamps:true})

const User = mongoose.model('User', userSchema)
module.exports = {User}