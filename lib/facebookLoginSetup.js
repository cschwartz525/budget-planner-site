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
            res.redirect('/');
        });

    app.get('/logout', function (req, res) {
      req.logout();
      res.redirect('/');
    });

    passport.use(
        new PassportFacebook({
            clientID: config.facebook.clientId,
            clientSecret: config.facebook.clientSecret,
            callbackURL: '//localhost:3000/login/facebook/return'
        },
        function (accessToken, refreshToken, profile, callback) {
            return callback(null, profile);
        })
    );

    passport.serializeUser(function (user, callback) {
        //nothing to do here as we use the username as it is
        callback( null, user );
    });

    passport.deserializeUser(function (obj, callback) {
        //again, we just pass the username forward
        callback( null, obj );
    });
}
