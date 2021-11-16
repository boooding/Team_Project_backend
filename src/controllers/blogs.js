const Blog = require('../models/blog')
const User = require('../models/users')
class BlogCtl {
    async readBlog(ctx) {
        ctx.body = await Blog.find({ title: new RegExp(ctx.query.q) })
    }
    async create(ctx) {
        ctx.verifyParams({
            title: { type: 'string', required: true },
            content: { type: 'string', required: true }
        })
        const authorId = ctx.params.id
        const author = await User.findById({_id: authorId})
        ctx.request.body.author = author.username;
        const blog = await new Blog(
            ctx.request.body
        ).save()
        await User.findByIdAndUpdate({_id: authorId},{ $push: {"blogList": blog._id}})
        ctx.body = blog;

    }
    async checkOwner(ctx, next) {
        if (ctx.params.id !== ctx.state.user._id) { ctx.throw(403, 'no authority'); }
        await next();
    }
}

module.exports = new BlogCtl();