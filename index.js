const Koa = require('koa');
const bodyparser = require('koa-bodyparser');

const cors = require('@koa/cors');

const server = new Koa();

const router = require('./src/routes');
require('dotenv').config();

const PORT = process.env.PORT || 8084;
server.use(cors());
server.use(bodyparser());
server.use(router.routes());

server.listen(PORT, () => console.log(`rodando na porta ${PORT}`));
