const jwt = require('koa-jwt');
const Router = require('koa-router');
const router = new Router({ prefix: '/users' });
const {
   create, login
} = require('../controllers/users');
const {KEY} = require("../config");

const auth = jwt({ KEY });

router.post('/', create);
router.post('/login', login)

module.exports = router;