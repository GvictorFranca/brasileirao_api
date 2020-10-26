const database = require('../helpers/database');

const getMatchs = async (rodada = null) => {
	const query =
		'SELECT id,time_casa,time_visitante,gols_casa,gols_visitante FROM JOGOS where rodada = $1';

	const result = database.query({
		text: query,
		values: [rodada],
	});
	return result;
};

const getMatchsForLeaderboard = async () => {
	const query = 'SELECT * from jogos';

	const result = database.query(query);
	return result;
};

const updateMatch = async (id, goalsScored, goalsConcern) => {
	const query = `UPDATE jogos SET gols_casa = $2, gols_visitante = $3 WHERE id = $1;`;
	const result = await database.query({
		text: query,
		values: [id, goalsScored, goalsConcern],
	});

	return result;
};

module.exports = { getMatchs, updateMatch, getMatchsForLeaderboard };
