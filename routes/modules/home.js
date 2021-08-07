// import Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// import data (resturant)
const Restaurant = require('../../models/restaurant')

// 準備引入路由模組

// homePage
router.get('/', (req, res) => {
  const SortData = require('../../models/SortData.json')
  const searchInput = req.query.keyword || ''
  const keyword = searchInput.trim().toLowerCase()
  const currentSortOption = req.query.sortOption || 'nameAsc'
  const currentSortParams = {}
  currentSortParams[SortData[currentSortOption]['sortItem']] = SortData[currentSortOption]['ac']
  Restaurant.find(
    {
      $or: [{ name: { $regex: keyword, $options: 'i' } }, { category: { $regex: keyword, $options: 'i' } }]
    }
  )
    .lean()
    .sort(currentSortParams)
    .then(restaurants => res.render('index', { restaurants, keyword, currentSortOption, SortData }))
    .catch(error => console.error(error))
})

// // search
// router.get('/search', (req, res) => {
//   const keyword = req.query.keyword.toLowerCase().trim()
//   Restaurant.find(
//     {
//       $or: [{ name: { $regex: keyword, $options: 'i' } }, { category: { $regex: keyword, $options: 'i' } }]
//     }
//   )
//     .lean()
//     .then(restaurants => res.render('index', { restaurants, keyword }))
//     .catch(error => console.error(error))
// })
// //sort
// router.get('/sort', (req, res) => {
//   console.log(req.query)

// })

// 匯出路由器
module.exports = router
