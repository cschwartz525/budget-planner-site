var express = require('express');
var handlebars = require('express-handlebars');
var path = require('path');
var request = require('request-promise');
var config = require('./config');
var handlebarsHelpers = require('./lib/handlebarsHelpers');
var middleware = require('./routes/middleware');
var utils = require('./lib/utils');

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
    var requestUrl = `${config.api.hostname}/budget/${budgetId}`;
    request(requestUrl)
        .then((response) => {
            var data = JSON.parse(response);
            data.total = utils.currencyFormat(utils.arraySum(data.lineItems.map((x) => x.amount * x.type)));
            data.lineItems.forEach((x) => {
                x.formattedValue = utils.currencyFormat(x.amount * x.type);
            });
            res.locals.currentTab = 'budget';
            res.render('budget', data);
        })
        .catch((error) => {
            console.error(error);
            res.send('ERROR: 404 Not Found')
        });
});

app.get('/budget/:id/add', function(req, res) {

});

app.get('/profile', function(req, res) {
    res.locals.currentTab = 'profile';
    res.render('profile', {});
});

app.listen(config.port, function() {
    console.log('Server is listening on port %d', config.port);
});
