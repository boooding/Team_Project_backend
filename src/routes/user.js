const jwt = require('koa-jwt');
const Router = require('koa-router');
const router = new Router({ prefix: '/users' });
const {
   create, login, readUser, findById, checkOwner, update, deleteUser, uploadAvatar
} = require('../controllers/users');
const {KEY} = require("../config");

const auth = jwt({
    secret: "key"
});

// account related
router.get('/', readUser)
router.get('/:id', findById);
router.delete('/:id', auth, checkOwner, deleteUser);
router.patch('/:id', auth, checkOwner, update)
router.post('/', create);

router.post('/login', login)


// avatar
router.post('/avatar',uploadAvatar)
module.exports = router;