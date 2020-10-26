/* eslint-disable no-restricted-syntax */
const Matchs = require('../repositories/matchs');

const getMatchs = async (ctx) => {
	const { rodada = null } = ctx.params;

	if (rodada) {
		const matchs = await Matchs.getMatchs(rodada);
		ctx.body = { matchs };
	}
};

module.exports = { getMatchs };
