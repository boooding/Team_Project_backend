const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/users');
const path = require('path')

class UsersCtl {
    // function for test to find all users
    async readUser(ctx) {
        ctx.body = await User.find({ username: new RegExp(ctx.query.q) })
    }
    // read user by id
    async findById(ctx) {
        const user = await User.findById(ctx.params.id)
        if (!user) { ctx.throw(404, 'the user does not exit'); }
        ctx.body = user;
    }
    // create
    async create(ctx) {
        ctx.verifyParams({
            username: { type: 'string', required: true, unique: true },
            password: { type: 'string', required: true }
        });
        const { username } = ctx.request.body;
        const repeatedUser = await User.findOne({ username });
        if (repeatedUser) { ctx.throw(409, 'username is used'); }
        const user = await new User(ctx.request.body).save();
        ctx.body = {
            message: "signup success",
            _id: user._id,
            username: user.username,
        }
    }
    // update
    async update(ctx) {
        ctx.verifyParams({
            username: { type: 'string', required: false },
            password: { type: 'string', required: false },
            // avatar_url: { type: 'string', required: false }
        });
        const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body);
        if (!user) { ctx.throw(404, 'the user does not exit'); }
        ctx.body = user;
    }
    // delete
    // check first
    async checkOwner(ctx, next) {
        if (ctx.params.id !== ctx.state.user._id) { ctx.throw(403, 'no authority'); }
        await next();
    }
    async deleteUser(ctx) {
        const user = await User.findByIdAndRemove(ctx.params.id);
        if (!user) { ctx.throw(404, 'the user does not exit'); }
        ctx.status = 204;
    }

    // login in
    async login(ctx) {
        ctx.verifyParams({
            username: { type: 'string', required: true },
            password: { type: 'string', required: true },
        });
        const user = await User.findOne(ctx.request.body);
        if (!user) { ctx.throw(401, 'username or password is incorrect'); }
        const { _id, username } = user;
        const token = jsonwebtoken.sign({ _id, username }, "key", { expiresIn: '2d' });
        ctx.body = { token, "message": "login success" };
    }

    // avatar upload
    uploadAvatar(ctx) {
        const file = ctx.request.files.file;
        ctx.body = {path: file.path}
    }
}

module.exports = new UsersCtl();