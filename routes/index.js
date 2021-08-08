// import Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth') // 掛載 middleware

// 引入 路由模組程式碼
const home = require('./modules/home')
const restaurants = require('./modules/resturants')
const users = require('./modules/users')
const auth = require('./modules/auth')

// 將網址結構符合 / 字串的 request 導向 home 模組
router.use('/restaurants', authenticator, restaurants)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)

// 匯出路由模組
module.exports = router
