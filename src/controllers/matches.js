/* eslint-disable no-restricted-syntax */
const Example = require('../repositories/example');

const leaderboard = [];

const insertOrUpdateTeam = (name, points, goalsScored, goalsConcern) => {
	const teamFounded = leaderboard.find((team) => team.name === name);

	if (teamFounded) {
		teamFounded.points += points;
		// eslint-disable-next-line no-plusplus
		teamFounded.fixturies++;
		teamFounded.victories += points === 3 ? 1 : 0;
		teamFounded.defeats += points === 0 ? 1 : 0;
		teamFounded.draws += points === 1 ? 1 : 0;
		teamFounded.goalsScored += goalsScored;
		teamFounded.goalsConcern += goalsConcern;
	} else {
		leaderboard.push({
			name,
			points,
			fixturies: 1,
			victories: points === 3 ? 1 : 0,
			defeats: points === 0 ? 1 : 0,
			draws: points === 1 ? 1 : 0,
			goalsScored,
			goalsConcern,
		});
	}
};

const calculateLeaderboard = (matchs) => {
	for (const match of matchs) {
		if (match.gols_casa > match.gols_visitante) {
			insertOrUpdateTeam(
				match.time_casa,
				3,
				match.gols_casa,
				match.gols_visitante
			);
			insertOrUpdateTeam(
				match.time_visitante,
				0,
				match.gols_visitante,
				match.gols_casa
			);
		} else if (match.gols_casa < match.gols_visitante) {
			insertOrUpdateTeam(
				match.time_casa,
				0,
				match.gols_casa,
				match.gols_visitante
			);
			insertOrUpdateTeam(
				match.time_visitante,
				3,
				match.gols_visitante,
				match.gols_casa
			);
		} else {
			insertOrUpdateTeam(
				match.time_casa,
				1,
				match.gols_casa,
				match.gols_visitante
			);
			insertOrUpdateTeam(
				match.time_visitante,
				1,
				match.gols_visitante,
				match.gols_casa
			);
		}
	}
};

const getMatchs = async (ctx) => {
	const matchs = await Example.getMatchs();
	ctx.body = matchs;
	calculateLeaderboard(matchs.rows);
};

module.exports = { getMatchs };
