const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const methodOverride = require('method-override');
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/articles');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: String,
  description: String
})

const Article = mongoose.model('Article', articleSchema);

app.all('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
});

app.get('/blogs', (req, res) => {
  Article.find({}, function(err, articles) {
    if (err) throw err;
    res.render('blogs/index', { articles: articles })
  });
})

app.get('/blogs/new', (req, res) => {
  res.render('blogs/new')
})

app.post('/blogs', (req, res) => {
  const newArticle = Article({title: req.body.title, description: req.body.description})

  newArticle.save(function(err) {
    if (err) throw err;
    res.redirect('/blogs');
  });
})

app.post('/blogs/:id', bodyParser.json(), (req, res) => {
  Article.findOneAndUpdate({ _id: req.params.id}, { title: req.body.title, description: req.body.description }, function(err, article) {
    if (err) throw err;

    res.redirect('/blogs');
  });
})

app.get('/blogs/:id', (req, res) => {
  Article.findOne({_id: req.params.id}, function(err, article) {
    if (err) throw err;

    res.render('blogs/show', { article: article })
  });
})

app.delete('/blogs/:id', (req, res) => {
  Article.findOneAndRemove({_id: req.params.id}, function(err) {
    if (err) throw err;

    // res.send('Article deleted');
    res.redirect('/blogs');
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
