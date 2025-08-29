function requireRole(allowedRoles = []) {
	return (req, res, next) => {
		const token = req.user || {};
		const role = token.role || (token.roles && token.roles[0]) || (token.customClaims && token.customClaims.role);
		if (!role || (allowedRoles.length && !allowedRoles.includes(role))) {
			return res.status(403).json({ error: 'Forbidden' });
		}
		next();
	};
}

module.exports = { requireRole };

function requireRole(allowedRoles = []) {
	return (req, res, next) => {
		const token = req.user || {};
		const role = token.role || (token.roles && token.roles[0]) || (token.customClaims && token.customClaims.role);
		if (!role || (allowedRoles.length && !allowedRoles.includes(role))) {
			return res.status(403).json({ error: Forbidden });
		}
		next();
	};
}

module.exports = { requireRole };
