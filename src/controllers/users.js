const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/users');
const {KEY} = require("../config");


class UsersCtl {
    async create(ctx) {
        ctx.verifyParams({
            username: { type: 'string', required: true, unique: true },
            password: { type: 'string', required: true }
        });
        const { username } = ctx.request.body;
        const repeatedUser = await User.findOne({ username });
        if (repeatedUser) { ctx.throw(409, 'username is used'); }
        const user = await new User(ctx.request.body).save();
        ctx.body = user;
    }
    async checkOwner(ctx, next) {
        if (ctx.params.id !== ctx.state.user._id) { ctx.throw(403, '没有权限'); }
        await next();
    }
    async update(ctx) {
        ctx.verifyParams({
            username: { type: 'string', required: false },
            password: { type: 'string', required: false },
            avatar_url: { type: 'string', required: false }
        });
        const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body);
        if (!user) { ctx.throw(404, '用户不存在'); }
        ctx.body = user;
    }

    async login(ctx) {
        ctx.verifyParams({
            username: { type: 'string', required: true },
            password: { type: 'string', required: true },
        });
        const user = await User.findOne(ctx.request.body);
        if (!user) { ctx.throw(401, 'username or password is incorrect'); }
        const { _id, name } = user;
        const token = jsonwebtoken.sign({ _id, name }, KEY, { expiresIn: '1d' });
        ctx.body = { token };
    }
}

module.exports = new UsersCtl();