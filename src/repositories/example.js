const database = require('../helpers/database');

const getMatchs = async () => {
	const query = 'SELECT * FROM JOGOS';

	const result = database.query(query);
	return result;
};

module.exports = { getMatchs };
