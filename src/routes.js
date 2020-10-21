const Router = require('koa-router');
const logger = require('./middlewares/logger');
const Matchs = require('./controllers/matches');
const Users = require('./controllers/users');

const router = new Router();

router.get('/games', Matchs.getMatchs);
router.get('/user/:id', Users.getUser);

router.get('/logger', logger, (ctx) => {
	ctx.body = 'Eu pasei pelo logger';
});

module.exports = router;
