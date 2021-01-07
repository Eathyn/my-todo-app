module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const webController = require('../../controllers/web')

  router.post('/register', webController.register)
  router.post('/login', webController.login)

  router.get('/user', webController.findUser, webController.getUser)

  router.get('/list/all', webController.findUser, webController.getLists)
  router.post('/list', webController.findUser, webController.createList, webController.getLists)
  router.patch('/list', webController.findUser, webController.modifyList, webController.getLists)
  router.delete('/list/:id', webController.findUser, webController.deleteList, webController.getLists)

  router.get('/list/:listId/task/all', webController.getTasks)
  router.post('/list/:listId/task', webController.addTask)
  router.delete('/list/:listId/task/:taskId', webController.deleteTask, webController.getTasks)

  app.use('/web/api', router)
}
