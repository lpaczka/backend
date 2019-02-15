const mongoose = require('mongoose')
const {Post} = require('./post')
const {User} = require('./users')

const URL_MONGO = "mongodb://lpaczka:Hola12@ds225038.mlab.com:25038/proyectofinal"
// const URL_MONGO = "mongodb://localhost:27017/proyectofinalprueba"
mongoose.connect(URL_MONGO, {useNewUrlParser:true}, err => {
    if(!err) console.log('Conexión exitosa')
})

module.exports = {
    Post,
    User
}