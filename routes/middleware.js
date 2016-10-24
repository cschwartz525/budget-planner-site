exports.initLocals = function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'Home', key: 'index', href: '/' },
		{ label: 'Budgets', key: 'budgets', href: '/budgets' },
		{ label: 'Profile', key: 'profile', href: '/profile' },
	];
	res.locals.user = req.user;
	next();
};
