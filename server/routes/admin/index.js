module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const adminController = require('../../controllers/admin')

  router.post('/register', adminController.register)
  router.post('/login', adminController.login)

  /* ---------- User Management ---------- */
  router.post('/userAdd', adminController.addUser)
  router.get('/users', adminController.getAllUsers)
  router.delete('/user/:id', adminController.deleteUser, adminController.getAllUsers)
  router.get('/user/:id', adminController.getUser)
  router.patch('/user/:id', adminController.modifyUser)

  /* ---------- Admin Management ---------- */
  router.post('/adminAdd', adminController.addAdmin)

  app.use('/admin/api', router)
}
