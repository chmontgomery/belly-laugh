var express = require('express'),
  exec = require('exec'),
  app = express(),
  os = require('os'),
  chalk = require('chalk'),
  linuxPlayCmd = 'play',
  macPlayCmd = 'afplay';

function noop() {
}

function playSound(path, cb) {
  var cmd = os.type() === 'Darwin' ? macPlayCmd : linuxPlayCmd,
    execCmd = cmd + ' ' + path;
  exec(execCmd, cb || noop);
  console.log('executed:', chalk.black.bgCyan(execCmd));
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

app.listen(7881);
console.log('server listening at', chalk.black.bgYellow('http://localhost:7881'));
