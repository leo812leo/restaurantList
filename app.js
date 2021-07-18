// Express
const express = require('express')
const app = express()
// 設定Server Port
const port = 3000
/* import */
const methodOverride = require('method-override')
const mongoose = require('mongoose')

const routes = require('./routes')
//mongoose
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error.')
})

db.once('open', () => {
  console.log('mongodb connected.')
})

// express-handlebars
const exphbs = require('express-handlebars')
// express template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' })) // 定義要使用的樣板引擎
app.set('view engine', 'handlebars') //設定的 view engine 是 handlebars
// body-parser
app.use(express.urlencoded({ extended: true }))
// setting static files
app.use(express.static('public'))
app.use(methodOverride('_method'))

// 將 request 導入路由器
app.use(routes)


//listener
app.listen(port, () => {
  console.log(`Express is listening on localhost ${port}`)
})