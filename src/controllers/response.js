const response = (ctx, code, data) => {
	const status = code >= 200 && code <= 399 ? 'sucess' : 'error';
	ctx.status = code;
	ctx.body = {
		status,
		data,
	};
};

module.exports = response;
