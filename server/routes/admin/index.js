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
  router.get('/admins', adminController.getAllAdmins)
  router.delete('/admin/:id', adminController.deleteAdmin)
  router.get('/admin/:id', adminController.getAdmin)
  router.patch('/admin/:id', adminController.modifyAdmin)
  router.patch('/admin/:id/email', adminController.modifyAdminEmail)
  router.patch('/admin/:id/name', adminController.modifyAdminName)
  router.patch('/admin/:id/password', adminController.modifyAdminPassword)

  app.use('/admin/api', router)
}
