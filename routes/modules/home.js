// import Express 與 Express 路由器
const express = require('express')
const router = express.Router()
//import data (resturant)
const Restaurant = require('../../models/restaurant')
// 準備引入路由模組

// homePage
router.get('/', (req, res) => {
  Restaurant.find() //拿全部資料
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})
// search
router.get('/search', (req, res) => {
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

// 匯出路由器
module.exports = router