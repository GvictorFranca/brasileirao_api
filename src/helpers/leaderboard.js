/* eslint-disable no-const-assign */
/* eslint-disable array-callback-return */
/* eslint-disable no-lonely-if */
/* eslint-disable no-else-return */

/* eslint-disable no-restricted-syntax */

const orderLeaderboard = (leaderboard) => {
	// eslint-disable-next-line consistent-return
	leaderboard.sort((a, b) => {
		if (a.points > b.points) {
			return -1;
		} else if (a.points > b.points) {
			return -1;
		} else {
			if (a.victories > b.victories) {
				return -1;
			} else if (b.victories > a.victories) {
				return 1;
			} else {
				const saldoA = a.goalsScored - a.goalsConcern;
				const saldoB = b.goalsScored - b.goalsConcern;

				if (saldoA > saldoB) {
					return -1;
				} else if (saldoB > saldoA) {
					return 1;
				} else {
					if (a.goalsScored > b.goalsScored) {
						return -1;
					} else if (b.goalsScored > a.goalsScored) {
						return 1;
					} else {
						return a.name.localeCompare(b.name);
					}
				}
			}
		}
	});
};

const calculateLeaderboard = (matchs, leaderboard) => {
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

module.exports = { orderLeaderboard, calculateLeaderboard };
