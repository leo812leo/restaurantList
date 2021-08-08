// import Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// import data (resturant)
const Restaurant = require('../../models/restaurant')
const User = require('../../models/user')

/* login */
// login page
router.get('/login', (req, res) => {
  return res.render('login')
})
module.exports = router

/* register */
// register page
router.get('/register', (req, res) => {
  return res.render('register')
})