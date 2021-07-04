// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
// express template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' })) // 定義要使用的樣板引擎
app.set('view engine', 'handlebars') //設定的 view engine 是 handlebars

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const restaurants_filter = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword)
  })
  console.log(restaurants_filter)
  res.render('index', { restaurants: restaurants_filter, keyword })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  res.render('show', { restaurant: restaurantList.results[Number(req.params.restaurant_id) - 1] })
})

//start and listen the Express sereve
app.listen(port, () => {
  console.log(`Express is listening on localhost ${port}`)
})