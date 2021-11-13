const Koa = require('koa');
const koaBody = require('koa-body');
const static = require('koa-static');
const error = require('koa-json-error');
const parameter = require('koa-parameter');
const path = require('path');


const app = new Koa();
const routing = require('./routes');
const {APP_PORT} = require("./config");

// DataBase connection


// middleware, handle the static file
app.use(
    static(
        path.join(__dirname, 'public')
    )
);

// middleware, format the error depend on environment
app.use(error({
    postFormat: (e, { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
}));

// middleware, handle the request body
app.use(koaBody({
    multipart: true,
    formidable: {
        uploadDir: path.join(__dirname, '/public/uploads'),
        keepExtensions: true,
    },
}));

// middleware, support parameter verify
app.use(parameter(app));

routing(app);

app.listen(
    APP_PORT,
    () => console.log('app start up success')
);