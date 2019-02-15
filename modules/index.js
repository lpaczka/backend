const mongoose = require('mongoose')
const {Post} = require('./post')
const {User} = require('./users')

// const URL_MONGO = "mongodb://prueba:5ykEfJ48i7fdKhg@ds013956.mlab.com:13956/proyectochingon"
const URL_MONGO = "mongodb://localhost:27017/proyectofinalprueba"
mongoose.connect(URL_MONGO, {useNewUrlParser:true}, err => {
    if(!err) console.log('Conexión exitosa')
})

module.exports = {
    Post,
    User
}