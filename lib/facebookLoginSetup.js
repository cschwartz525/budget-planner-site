var PassportFacebook = require('passport-facebook');
var config = require('../config');

module.exports = function(app, passport) {
    var initializedPassport = passport.initialize();
    var passportSession = passport.session();

    app.use(initializedPassport);
    app.use(passportSession);

    app.get('/login/facebook', passport.authenticate('facebook'));

    app.get('/login/facebook/return', passport.authenticate('facebook', { failureRedirect: '/login' }),
        function (req, res) {
            var profilePicture = req.user.photos ? req.user.photos[0].value : '/images/unknown-user.jpg';
            res.cookie('profilePicture', profilePicture);
            res.cookie('userFullName', 'Craig Schwartz');
            res.cookie('userId', req.user.id);
            res.redirect('/');
        });

    app.get('/logout', function (req, res) {
      req.logout();
      res.clearCookie('userId');
      res.clearCookie('profilePicture');
      res.clearCookie('userFullName');
      res.redirect('/');
    });

    passport.use(
        new PassportFacebook({
            clientID: config.facebook.clientId,
            clientSecret: config.facebook.clientSecret,
            callbackURL: '//localhost:3000/login/facebook/return',
            profileFields: ['id', 'displayName', 'name', 'photos']
        },
        function (accessToken, refreshToken, profile, callback) {
            return callback(null, profile);
        })
    );

    passport.serializeUser(function (user, callback) {
        callback( null, user );
    });

    passport.deserializeUser(function (obj, callback) {
        callback( null, obj );
    });
}
