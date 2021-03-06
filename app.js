/* import modules */
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
/* import User define modules */
const routes = require('./routes')
const usePassport = require('./config/passport')
require('./config/mongoose')

const app = express()
/* setting */
// express template engine
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: require('./controller/handlebarHelpers')
})) // 定義要使用的樣板引擎

app.set('view engine', 'handlebars') // 設定的 view engine 是 handlebars
// body-parser
app.use(express.urlencoded({ extended: true }))
// setting static files
app.use(express.static('public'))
// methodOverride
app.use(methodOverride('_method'))
// session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
// Passport
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg') // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg') // 設定 warning_msg 訊息
  next()
})
// 將 request 導入路由器
app.use(routes)

// 設定Server Port
const port = process.env.PORT
// listener
app.listen(port, () => {
  console.log(`Express is listening on localhost ${port}`)
})
