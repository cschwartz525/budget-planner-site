exports.initLocals = function(req, res, next) {
    res.locals.navLinks = [
				{
		        label: 'Home',
		        key: 'index',
		        href: '/'
    		},
				{
		        label: 'Budgets',
		        key: 'budgets',
		        href: '/budgets'
    		},
				{
		        label: 'Profile',
		        key: 'profile',
		        href: '/profile'
    		},
		];
    res.locals.user = req.user;
    next();
};

exports.facebookCheck = function(req, res, next) {
    if (req.cookies.userId) {
        res.locals.loggedIn = true;
    } else {
        res.locals.loggedIn = false;
    }
    res.locals.userFullName = req.cookies.userFullName;
    res.locals.profilePicture = req.cookies.profilePicture;
    next();
}
