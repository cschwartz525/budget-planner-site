var request = require('request-promise');
var config = require('../config');
var utils = require('../lib/utils');

var index = function(req, res) {
    res.locals.currentTab = 'index';
    res.render('index', {});
};

var budgets = function(req, res) {
    res.locals.currentTab = 'budgets';
    res.render('budgets', {});
};

var getBudgetById = function(req, res) {
    var budgetId = req.params.budgetId;
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
};

var addLineItemToBudget = function(req, res) {

};

var profile = function(req, res) {
    res.locals.currentTab = 'profile';
    res.render('profile', {});
}

module.exports = {
    index: index,
    budgets: budgets,
    getBudgetById: getBudgetById,
    addLineItemToBudget: addLineItemToBudget,
    profile: profile,
};
