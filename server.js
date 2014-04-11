var express = require('express'),
  exec = require('exec'),
  app = express();

function playLaugh(cb) {
  exec('play belly_laugh.mp3', cb);
}

app.get('/', function(req, res){
  playLaugh(function() {
    res.send('belly laugh <input type="button" onclick="window.location.reload();" value="reload"/>');
  });
});

app.get('/important', function(req, res) {
  exec('play important.mp3');
  res.send(200);
});

app.get('/4d3d3d', function(req, res) {
  exec('play 4d3d3d.mp3');
  res.send(200);
});

app.get('/bellylaugh', function(req, res){
  playLaugh(function() {
    res.send(200);
  });
});

app.listen(7881);
console.log('server listening at http://localhost:7881');
