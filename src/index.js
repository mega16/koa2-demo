const Koa = require('koa');
const statics = require('koa-static');
const views = require('koa-views');
const path = require('path');
const router = require('./router');

const staticPath = './static';

const app = new Koa();

//静态资源
app.use(statics(path.resolve(__dirname, staticPath)));

// 加载模板引擎
app.use(views(path.resolve(__dirname, './views'), {
    extension: 'ejs'
}));

// 加载路由
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
    console.log('localhost:3000 start ....');
});


