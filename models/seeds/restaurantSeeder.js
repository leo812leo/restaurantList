// mongoose (取得資料庫連線狀態)
const db = require('../../config/mongoose')
// 載入 data (種子資料+資料庫資料)
const restaurantList = require('./restaurant.json').results
const Restaurant = require('../restaurant')



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
  console.log('Success to set the seeder!')
})