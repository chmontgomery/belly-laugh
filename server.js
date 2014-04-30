var express = require('express'),
  exec = require('exec'),
  app = express(),
  os = require('os'),
  linuxPlayCmd = 'play',
  macPlayCmd = 'afplay';

function noop() {
}

function playSound(path, cb) {
  var cmd = os.type() === 'Darwin' ? macPlayCmd : linuxPlayCmd,
    execCmd = cmd + ' ' + path;
  exec(execCmd, cb || noop);
  console.log('executed:', execCmd);
}

function speak(text, cb) {
  var execCmd = 'espeak -v female3 "' + text + '"';
  exec(execCmd, cb || noop);
  console.log('executed:', execCmd);
}

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.set('title', 'Belly Laugh');

app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.get('/', function (req, res) {
  res.render('home', {
    title: app.get('title')
  });
});

app.get('/important', function (req, res) {
  playSound('sounds/important_work.mp3');
  res.send(200);
});

app.get('/4d3d3d', function (req, res) {
  playSound('sounds/4d3d3d.mp3');
  res.send(200);
});

app.get('/bellylaugh', function (req, res) {
  playSound('sounds/belly_laugh.mp3');
  res.send(200);
});

app.get('/goodmorning/:name', function (req, res) {
  var name = req.params.name;
  speak('good morning ' + name);
  res.send(200);
});

app.get('/say/:text', function (req, res) {
  var text = req.params.text.split('_').join(' ');
  speak(text);
  res.send(200);
});

app.listen(7881);
console.log('server listening at', 'http://localhost:7881');
