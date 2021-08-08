const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  id: Number,
  name: {
    type: String,
    required: true
  },
  image: String,
  category: String,
  rating: Number,
  location: String,
  google_map: String,
  phone: String,
  description: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)