const jwt = require('jsonwebtoken');
const response = require('./response');
const Users = require('../repositories/users');
const Password = require('../helpers/password');

require('dotenv').config();

const authenticate = async (ctx) => {
	const { email = null, senha = null } = ctx.request.body;

	if (!email || !senha) {
		return response(ctx, 400, { message: 'Pedido mal Formatado' });
	}

	const user = await Users.getUserByEmail(email);

	if (user) {
		const comparison = await Password.check(senha, user.senha);

		if (comparison) {
			const token = await jwt.sign(
				{ id: user.id, email: user.email },
				process.env.JWT_SECRET || 'cubos',
				{
					expiresIn: '1h',
				}
			);
			return response(ctx, 200, { token });
		}
	}

	return response(ctx, 200, {
		message: 'Email ou senha mal formatados ou incorretos',
	});
};

module.exports = { authenticate };
