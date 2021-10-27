const jwt = require('jsonwebtoken');
const User = require('../orm/Model/User')
const { jwtPassword } = require('../config')
class UsersCtl {
    // create user
    async createUser(ctx) {
        ctx.verifyParams({
            username: { type: 'string', required: true },
            password: { type: 'string', required: true }
        });
        const { username } = ctx.request.body;
        const userExit = await User.findOne({ username });
        if (userExit) {
            ctx.throw(409, 'username already exists');
        }
        const user = await new User(ctx.request.body).save();
        ctx.body = user;
    }

    // read user
    async
    // update user
    // async update(ctx) {
    //     ctx.verifyParams({
    //         userName: { type: 'string', required: true },
    //         password: { type: 'string', required: true }
    //     });
    //     const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body);
    //     if (!user) { ctx.throw(404, 'Username does not exist'); }
    //     ctx.body = user;
    // }

    // delete
    // async delete(ctx) {
    //     const user = await User.findByIdAndRemove(ctx.params.id);
    //     if (!user) { ctx.throw(404, '用户不存在'); }
    //     ctx.status = 204;
    // }

    // find all users page by page
    // async find(ctx) {
    //     const { per_page = 10 } = ctx.query;
    //     const page = Math.max(ctx.query.page * 1, 1) - 1;
    //     const perPage = Math.max(per_page * 1, 1);
    //     ctx.body = await User
    //         .find({ name: new RegExp(ctx.query.q) })
    //         .limit(perPage)
    //         .skip(page * perPage);
    // }

    // find users by id
    // async findById(ctx) {
    //     const { fields = '' } = ctx.query;
    //     const selectFields = fields.split(';').filter(f => f).map(f => ' +' + f).join('');
    //     const populateStr = fields.split(';').filter(f => f).map(f => {
    //         if (f === 'employments') {
    //             return 'employments.company employments.job';
    //         }
    //         if (f === 'educations') {
    //             return 'educations.school educations.major';
    //         }
    //         return f;
    //     }).join(' ');
    //     const user = await User.findById(ctx.params.id).select(selectFields)
    //         .populate(populateStr);
    //     if (!user) { ctx.throw(404, '用户不存在'); }
    //     ctx.body = user;
    // }

    // Login
    async login(ctx) {
        ctx.verifyParams({
            username: { type: 'string', required: true },
            password: { type: 'string', required: true }
        });
        const user = await User.findOne(ctx.request.body);
        if (!user) { ctx.throw(401, 'userName or password is error'); }
        const { _id, username } = user;
        const token = jwt.sign({ _id, username }, jwtPassword, { expiresIn: '1d' });
        ctx.body = { token };
    }

    async find(ctx) {

    }
}

module.exports = new UsersCtl();