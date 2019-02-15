const express = require('express')
const bodyParser = require('body-parser')
const {Post,User} = require('./modules/index')
const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send(console.log('Holi'))
})

app.post('/create/user', (req, res) => {
    const {name, nickname, image} = req.body
    const newUser = User({
        name,
        nickname,
        image
    })
    newUser.save((err, user) => {
        err 
        ? res.status(400).send(err.errmsg)
        : res.status(201).send(user)
    })
})

app.get('/get/users', (req, res) => {
    User.find().exec()
    .then(post => {
        res.status(200).send(post)
    })
    .catch(err => {
        res.status(400).send(err)
    })
})

app.post('/create/post', (req, res) => {
    const {user, body} = req. body
    const newPost = Post({
        user,
        body
    })
    newPost.save((err, post) => {
        err
        ? res.status(400).send(err)
        : res.status(201).send(post)
    })
})
app.get('/get/posts', (req,res) => {
    Post.find()
    .populate(['comments.user','user','reaction.user'])
    .exec()
    .then(posts => {
        res.status(200).send(posts)
    })
    .catch(err => {
        res.status(400).send(err)
    })
})
app.put('/update/reaction/:uid', (req, res) => {
    const {uid} = req.params
    const {like, user} = req.body
    Post.findByIdAndUpdate({_id: uid}, {$push: {reaction: {like, user}}})
    .exec()
    .then(post => {
        res.send(post)
    })
    .catch(err =>{
        res.send(err)
    })
})
app.put('/update/reaction/comment/:uid', (req, res) => {
    const {uid} = req.params
    const {like, user} = req.body
    Post.findByIdAndUpdate({"comments._id": uid}, {$push: {reaction: {like, user}}})
    .exec()
    .then(post => {
        res.send(post)
    })
    .catch(err =>{
        res.send(err)
    })
})
app.put('/update/comment/:uid', (req, res) => {
    const {uid} = req.params
    const {body, user} = req.body
    Post.findByIdAndUpdate({_id: uid}, {$push: {comments: {body, user}}})
    .exec()
    .then(post => {
        res.send(post)
    })
    .catch(err =>{
        res.send(err)
    })
})
app.delete('/delete/post/:uid', (req, res) => {
    const {uid} = req.params
    Post.findByIdAndDelete(uid).exec()
    .then(post => {
        res.status(200).send(post)
    })
    .catch(err => {
        res.status(400).send(err)
    })
})
app.listen(PORT, () => {
    console.log('servidor on')
})