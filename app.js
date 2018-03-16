const Koa = require('koa2')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const path = require('path')
const winston = require('winston')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

winston.configure({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({filename: 'somefile.log'})
  ]
})
winston.level = 'error'
winston.log('error', 'hello world!',{desc:'操作数据库'})

winston.profile('test')

setTimeout(function () {
  winston.profile('test')
}, 1000)

app.listen(3000)
