const Router = require('koa-router');
const User = require('../db/user');

// hone page
const home = new Router();
home.get('/', async (ctx) => {
    let title = 'Home Page';
    await ctx.render('home', {title})
});


// login page
const login = new Router();
login.get('/', async (ctx) => {
    let title = 'Login page';
    await ctx.render('login', { title });
}).post('/', async (ctx) => {
    const data = ctx.request.body;
    let queryres = await User.queryEmail(data.email);
    console.log(queryres);
    if(queryres){
        if(queryres[0].password === data.password){
            ctx.body = {
                'code': 1,
                'data': queryres[0],
                'mesg': '登录成功'
            }
        }else {
            ctx.body = {
                'code': 0,
                'data': {},
                'mesg': '密码错误'
            }
        }
    } else {
        ctx.body = {
            'code': 0,
            'data': {},
            'mesg': '无用户'
        }
    }
    
});

// register
const register = new Router();
register.get('/', async (ctx) => {
    let title = 'Register page';
    await ctx.render('register', { title });
}).post('/', async (ctx) => {
    const data = ctx.request.body;
    let queryres = await User.queryEmail(data.email);
    if(queryres){
        ctx.body = {
            'code': 0,
            'data': {},
            'mesg': '已注册'
        }
    } else {
        await User.save(data);
        ctx.body = {
            'code': 1,
            'data': {},
            'mesg': 'success'
        }
    }
})

// 404 page
const page404 = new Router();
page404.get('/', async (ctx) => {
    let title = '404 Page';
    await ctx.render('404', { title });
});


let router = new Router();
router.get('/', async (ctx) => {
    let title = 'Index page';
    await ctx.render('index', { title })
});

router.use('/home', home.routes(), home.allowedMethods());
router.use('/login', login.routes(), login.allowedMethods());
router.use('/register', register.routes(), register.allowedMethods());
router.use('/404', page404.routes(), page404.allowedMethods());

module.exports = router;