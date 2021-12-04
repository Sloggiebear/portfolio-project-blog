const express = require('express')
const mongoose = require('mongoose')
const article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOveride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/blog')
app.set ('view engine' , 'ejs')

app.use(express.urlencoded({ extended: false})) // Important that this is defined before app.get
app.use(methodOveride('_method')) // this allows you to override the form methods "GET POST" with PUT and DELETE by defining "_method" in the action

app.get('/', async (req, res) => {
    const articles = await article.find().sort({
        createDate: 'desc'
    })
    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)


app.listen(5000)