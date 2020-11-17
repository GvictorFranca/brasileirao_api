const database = require('../helpers/database');

const getUser = async (id = null) => {
	if (!id) {
		return null;
	}

	const query = `SELECT * FROM users WHERE id = $1`;
	const result = await database.query({
		text: query,
		values: [id],
	});

	return result.rows.shift();
};

const getUserByEmail = async (email = null) => {
	if (!email) {
		return null;
	}

	const query = `SELECT * FROM users WHERE email = $1;`;
	const result = await database.query({
		text: query,
		values: [email],
	});

	return result.rows.shift();
};

module.exports = { getUser, getUserByEmail };
