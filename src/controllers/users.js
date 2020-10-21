const response = require('./response');
const Users = require('../repositories/users');

const getUser = async (ctx) => {
	const { id = null } = ctx.params;

	if (id) {
		const result = await Users.getUser(id);
		if (result) {
			return response(ctx, 200, result);
		}
		return response(ctx, 404, { message: 'User not found' });
	}

	return response(ctx, 400, { message: 'Wrong formatted' });
};

module.exports = { getUser };
