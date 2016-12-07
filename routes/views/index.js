module.exports = function(req, res) {
    var locals = res.locals;

    // Render the view
    res.render('index', locals);
};
