const mongoose = require('mongoose')
const restaurant = require('../restaurant')
const raw = require('../../restaurant.json')

const db = mongoose.connection

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('mongodb error.')
})

db.once('open', () => {
  console.log('MongoDB connected.')
  console.log('Done.')
})