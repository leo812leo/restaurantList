if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bcrypt = require('bcryptjs')
// DB_data
const Restaurant = require('../restaurant')
const User = require('../user')
// seed
const SEED_USER = require('./userSeed.json')
const SEED_RESTAURANT = require('./restaurant.json')
// connect to db
const db = require('../../config/mongoose')

// 連線成功
db.once('open', () => {
  Promise.all(
    SEED_USER.map(user =>
      bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(user.password, salt))
        .then(hash =>
          User.create({
            name: user.name,
            email: user.email,
            password: hash
          }))
        .then(userDB => {
          const restaurants = SEED_RESTAURANT.filter(restaurant => user.belongRestaurants.includes(restaurant.id))
          restaurants.forEach(restaurant => { restaurant.userId = userDB._id })
          return Restaurant.create(restaurants)
        })
    ))
    .then(() => {
      console.log('done.')
      process.exit()
    })
    .catch(error => console.log(error))
})
