// Express
const express = require('express')
const app = express()
// 設定Server Port
const port = 3000
/* import */
const methodOverride = require('method-override')
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
app.use(methodOverride('_method'))

// routes setting
// index
app.get('/', (req, res) => {
  Restaurant.find() //拿全部資料
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

/* create */
//creat page
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})
//creat restaurant
app.post('/restaurants', (req, res) => {
  const { name, image, category, rating, location, google_map, phone, description } = req.body
  console.log(name, image, category, rating, location, google_map, phone, description)
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

app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const { name, image, category, rating, location, google_map, phone, description } = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
      [restaurant.name, restaurant.image, restaurant.category, restaurant.rating, restaurant.location, restaurant.google_map, restaurant.phone, restaurant.description] =
        [name, image, category, rating, location, google_map, phone, description];
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))

})
// delete
app.delete('/restaurants/:id', (req, res) => {
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
  const keyword = req.query.keyword.toLowerCase().trim()
  Restaurant.find(
    {
      $or: [{ name: { $regex: keyword, $options: 'i' } }, { category: { $regex: keyword, $options: 'i' } }]
    }
  )
    .lean()
    .then(restaurants => res.render('index', { restaurants, keyword }))
    .catch(error => console.error(error))
})

//listener
app.listen(port, () => {
  console.log(`Express is listening on localhost ${port}`)
})