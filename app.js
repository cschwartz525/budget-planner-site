var express = require('express');
var handlebars = require('express-handlebars');
var path = require('path');
var config = require('./config');
var handlebarsHelpers = require('./lib/handlebarsHelpers');
var middleware = require('./routes/middleware');

var app = express();

process.env.PWD = process.cwd();

app.use(express.static(path.join(process.env.PWD, config.dir.public)));

var hbs = handlebars.create({
  defaultLayout: 'base',
  partialsDir: path.join(process.env.PWD, config.dir.partials),
  helpers: {
    ifeq: handlebarsHelpers.ifeq
  }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(process.env.PWD, config.dir.views));

app.use(middleware.initLocals);

app.get('/', function(req, res) {
  res.locals.currentTab = 'index';
  res.render('index', {});
});

app.get('/budgets', function(req, res) {
  res.locals.currentTab = 'budgets';
  res.render('budgets', {});
});

app.get('/budget/:id', function(req, res) {
  var budgetId = req.params.id;
  // Get budget info by id from REST service
  var data = {};
  res.locals.currentTab = 'budget';
  res.render('budget', data);
});

app.get('/profile', function(req, res) {
  res.locals.currentTab = 'profile';
  res.render('profile', {});
});

app.listen(config.port, function() {
  console.log('Server is listening on port %d', config.port);
});
