const Router = require('koa-router');
const logger = require('./middlewares/logger');
const Hello = require('./controllers/hello');

const router = new Router();

router.get('/hello', Hello.hello);
router.get('/hello2', Hello.hello);

router.get('/logger', logger, (ctx) => {
	ctx.body = 'Eu pasei pelo logger';
});

module.exports = router;
