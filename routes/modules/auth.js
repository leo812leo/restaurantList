// import Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const passport = require('passport')

// 準備引入路由模組
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}))

router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

module.exports = router
