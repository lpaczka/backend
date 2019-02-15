const mongoose = require('mongoose')
// const URL_MONGO = "mongodb://lpaczka:Hola12@ds225038.mlab.com:25038/proyectofinal"
const URL_MONGO = "mongodb://localhost:27017/proyectofinalprueba"
mongoose.connect(URL_MONGO,  {useNewUrlParser:true}, err => {
    if(!err) console.log('Conexión exitosa')
})

const Schema = mongoose.Schema
const postSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    body: {
        type: String,
        required: true
    },
    comments: {
        type: [{
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            body: {
                type:String,
                required:true
            },
            reaction: {
                type: [{
                    like: {
                        type: String,
                        enum: ['Like', 'MeEncanta', 'MeDivierte', 'MeAsombra', 'MeEntristece', 'MeEnoja']
                }, user: {
                    type: Schema.Types.ObjectId,
                    ref: 'User'
                    }
                }]
            },
            response:  {
                type: [{
                    user: {
                        type: Schema.Types.ObjectId,
                        ref: 'User'
                    },
                    body: {
                        type:String,
                        required:true
                    },
            reaction: {
                        type: [{
                            like: {
                                type: String,
                                enum: ['Like', 'MeEncanta', 'MeDivierte', 'MeAsombra', 'MeEntristece', 'MeEnoja']
                        }, user: {
                            type: Schema.Types.ObjectId,
                            ref: 'User'
                            }
                        }]
                    }
                }]
            }
        }]
    },
    reaction: {
        type: [{
            like: {
                type: String,
                enum: ['Like', 'MeEncanta', 'MeDivierte', 'MeAsombra', 'MeEntristece', 'MeEnoja']
        }, user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
            }
        }]
    }
}, {timestamps:true});

const Post = mongoose.model('Post', postSchema)

module.exports = {Post}