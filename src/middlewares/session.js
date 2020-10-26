const verify = async (ctx, next) => {
	return next();
};

module.exports = { verify };
