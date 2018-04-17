const express = require('express');
const bodyParser= require('body-parser')
const app = express();
app.set('view engine', 'pug')

app.all('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
});

app.get('/blogs', (req, res) => {
  res.send('All');
})

app.post('/blogs', bodyParser.json(), (req, res) => {
  res.send('Create');
})

app.post('/blogs/:id', bodyParser.json(), (req, res) => {
  res.send('Update');
})

app.get('/blogs/:id', (req, res) => {
  res.send('Read');
})

app.delete('/blogs/:id', (req, res) => {
  res.send('Delete');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
