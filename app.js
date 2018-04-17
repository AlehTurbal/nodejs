const express = require('express');
const app = express();

const article = {
      "author": "BBC News",
      "title": "Joint Pulitzer prize for Weinstein exposé",
      "description": "The journalism honour is won for reporting on the Hollywood producer's alleged sexual misconduct.",
      "url": "http://www.bbc.co.uk/news/world-us-canada-43790151",
      "urlToImage": "https://ichef-1.bbci.co.uk/news/1024/branded_news/D318/production/_100904045_mediaitem100904044.jpg",
      "publishedAt": "2018-04-16T20:14:42Z"
    }

app.all('/', function (req, res) {
  res.json(article);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
