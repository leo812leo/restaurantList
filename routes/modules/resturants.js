// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
//import data (resturant)
const Restaurant = require('../../models/restaurant')

// 準備引入路由模組

/* create */
//to creat page
router.get('/new', (req, res) => {
  return res.render('new')
})
//creat restaurant
router.post('/', (req, res) => {
  const { name, image, category, rating, location, google_map, phone, description } = req.body
  return Restaurant.create({ name, image, category, rating, location, google_map, phone, description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


/* read */
//detial
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})


/* update */
//to update page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
//update restaurant
router.put('/:id', (req, res) => {
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


/* delete */
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


// 匯出路由器
module.exports = router