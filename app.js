var express = require('express');
var handlebars = require('express-handlebars');
var path = require('path');
var config = require('./config');
var handlebarsHelpers = require('./lib/handlebarsHelpers');
var middleware = require('./routes/middleware');
var routes = require('./routes/controller');

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

app.get('/', routes.index);
app.get('/budgets', routes.budgets);
app.get('/budget/:budgetId', routes.getBudgetById);
app.get('/budget/:budgetId/add', routes.addLineItemToBudget);
app.get('/profile', routes.profile);

app.listen(config.port, function() {
    console.log('Server is listening on port %d', config.port);
});
