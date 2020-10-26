/* eslint-disable no-const-assign */
/* eslint-disable array-callback-return */
/* eslint-disable no-lonely-if */
/* eslint-disable no-else-return */
const Matchs = require('../repositories/matchs');
const Leaderboard = require('../helpers/leaderboard');

const getLeaderboard = async (ctx) => {
	const leaderboard = [];
	const matchs = await Matchs.getMatchsForLeaderboard();

	Leaderboard.calculateLeaderboard(matchs.rows, leaderboard);
	Leaderboard.orderLeaderboard(leaderboard);
	ctx.body = { leaderboard };
};

const updateMatch = async (ctx) => {
	const {
		id = null,
		goalsScored = null,
		goalsConcern = null,
	} = ctx.request.body;
	const match = await Matchs.updateMatch(id, goalsScored, goalsConcern);
	ctx.body = { match };
};

module.exports = { getLeaderboard, updateMatch };
