// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// import data (resturant)
const Restaurant = require('../../models/restaurant')

// 準備引入路由模組

/* create */
// to creat page
router.get('/new', (req, res) => {
  return res.render('new')
})
// creat restaurant
router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, image, category, rating, location, googleMap, phone, description } = req.body
  return Restaurant.create({ name, image, category, rating, location, googleMap, phone, description, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

/* read */
// detial
router.get('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

/* update */
// to update page
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
// update restaurant
router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const { name, image, category, rating, location, googleMap, phone, description } = req.body
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      [restaurant.name, restaurant.image, restaurant.category, restaurant.rating, restaurant.location, restaurant.googleMap, restaurant.phone, restaurant.description] =
        [name, image, category, rating, location, googleMap, phone, description]
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

/* delete */
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 匯出路由器
module.exports = router
