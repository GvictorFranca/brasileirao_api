const Router = require('koa-router');
const Leaderboard = require('./controllers/leaderboard');
const Matchs = require('./controllers/matchs');

const Auth = require('./controllers/auth');
const Session = require('./middlewares/session');

const router = new Router();

router.post('/auth', Auth.authenticate);

router.post('/update', Session.verify, Leaderboard.updateMatch);
router.get('/leaderboard', Leaderboard.getLeaderboard);
router.get('/matchs/:rodada', Matchs.getMatchs);

module.exports = router;
