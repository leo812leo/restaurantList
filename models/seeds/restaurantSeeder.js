// mongoose
const mongoose = require('mongoose')
// 載入 restaurant list 種子資料
const restaurantList = require('./restaurant.json').results
const Restaurant = require('../restaurant')
// connect to database
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error.')
})
// 連線成功
db.once('open', () => {
  //intialize
  restaurantList.forEach((restaurant) =>
    Restaurant.create({
      id: restaurant.id,
      name: restaurant.name,
      name_en: restaurant.name_en,
      category: restaurant.category,
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone,
      google_map: restaurant.google_map,
      rating: restaurant.rating,
      description: restaurant.description
    })
  )
  console.log('MongoDB connected.')
  console.log('Success to set the seeder!')
})