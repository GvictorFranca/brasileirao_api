const Router = require('koa-router');
const logger = require('./middlewares/logger');
const Hello = require('./controllers/hello');
const Users = require('./controllers/users');

const router = new Router();

router.get('/hello', Hello.hello);
router.get('/user/:id', Users.getUser);

router.get('/logger', logger, (ctx) => {
	ctx.body = 'Eu pasei pelo logger';
});

module.exports = router;
