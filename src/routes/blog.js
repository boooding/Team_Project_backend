const Router = require('koa-router');
const jwt = require("koa-jwt");
const router = new Router({ prefix: '/blogs' });
const {
    create, checkOwner
} = require('../controllers/blogs')

const auth = jwt({
    secret: "key"
});

router.post('/:id', auth, checkOwner, create)

module.exports = router;