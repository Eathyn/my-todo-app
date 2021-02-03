module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const adminController = require('../../controllers/admin')

  router.post('/register', adminController.register)
  router.post('/login', adminController.login)

  /* ---------- User Management ---------- */
  router.post('/userAdd', adminController.userAdd)

  app.use('/admin/api', router)
}
