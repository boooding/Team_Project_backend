const Router = require('koa-router');
const router = new Router({ prefix: '/users' });
const {
   create
} = require('../controllers/users');

router.post('/', create);

module.exports = router;