const Koa = require('koa'),
    bodyParser = require('koa-bodyParser'),
    router = require('koa-router')(),
    json = require('koa-json'),
    logger = require('koa-logger'),
    auth = require('./server/routes/auth'),
    verify = require('./server/routes/verify'),
    list = require('./server/routes/list'),
    blog = require('./server/routes/blog_api'),
    path = require('path'),
    server = require('koa-static'),
    historyApiFallback = require('koa2-history-api-fallback'),
    jwt = require('koa-jwt');
const app = new Koa();
const socket = require('http').Server(app.callback());
const io = require('socket.io')(socket);

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
    console.log(msg)
    io.emit('chat message', msg);
    });
});

app.use(bodyParser());
app.use(json());
app.use(logger());

app.use(async (ctx, next) => {
    var start = new Date;

    var ms = new Date - start;
    console.log('%s %s - %s', ctx.request.method, ctx.request.url);
    await next();
});

app.use(async (ctx, next) => {
    try {
        await next();
    }
    catch (err) {
        if (401 === err.status) {
            ctx.status = 401;
            ctx.body = {
                success: false,
                token: null,
                info: 'Protected resource, use Authorization header to get access'
            };
        } else {
            throw err
        }


    }
})

router.use('/list', jwt({secret:'vue-koa-demo'}), list.routes());
router.use('/verify', verify.routes());
router.use('/auth', auth.routes());
router.use('/blog_api', blog.routes());

app.use(router.routes())
app.use(historyApiFallback())
app.use(server(path.resolve('dist')))

socket.listen(8999);
console.log('8999 +' + 'time +' + new Date().toLocaleString() );