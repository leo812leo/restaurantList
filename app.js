// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const restaurant = require('./models/restaurantSchema')
//mongoose
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error.')
})

db.once('open', () => {
  console.log('mongodb connected.')
})

// require express-handlebars here
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
// express template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' })) // 定義要使用的樣板引擎
app.set('view engine', 'handlebars') //設定的 view engine 是 handlebars
// body-parser
app.use(bodyParser.urlencoded({ extended: true }))
// setting static files
app.use(express.static('public'))


// routes setting
// index
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})


// search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const restaurants_filter = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword)
  })
  res.render('index', { restaurants: restaurants_filter, keyword })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  res.render('show', { restaurant: restaurantList.results[Number(req.params.restaurant_id) - 1] })
})



//listener
app.listen(port, () => {
  console.log(`Express is listening on localhost ${port}`)
})