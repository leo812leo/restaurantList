// Express
const express = require('express')
const app = express()
// 設定Server Port
const port = 3000

const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
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


// routes setting
// index
app.get('/', (req, res) => {
  Restaurant.find() //拿全部資料
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

// create
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})
// read
app.post('/restaurants', (req, res) => {
  const name = req.body.name
  const image = req.body.image
  const category = req.body.category
  const rating = req.body.rating
  const location = req.body.location
  const google_map = req.body.google_map
  const phone = req.body.phone
  const description = req.body.description

  return Restaurant.create({ name, image, category, rating, location, google_map, phone, description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
//update (edit)
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const image = req.body.image
  const category = req.body.category
  const rating = req.body.rating
  const location = req.body.location
  const google_map = req.body.google_map
  const phone = req.body.phone
  const description = req.body.description
  console.log(name, rating)
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.image = image
      restaurant.category = category
      restaurant.rating = rating
      restaurant.location = location
      restaurant.google_map = google_map
      restaurant.phone = phone
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))

})
// delete
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


//detial
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
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