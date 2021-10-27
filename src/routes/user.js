const jwt = require('koa-jwt');
const Router = require('koa-router');
const router = new Router({ prefix: '/users' });

const {
    createUser, login
} = require('../controllers/users');

//
router.post('/', createUser);
router.post('/login', login)

module.exports = router;