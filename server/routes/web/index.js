module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const webController = require('../../controllers/web')

  router.post('/register', webController.register)
  router.post('/login', webController.login)
  router.get('/user', webController.findUser, webController.getUserInfo)

  /* ----- List ----- */
  router.get('/list/all', webController.findUser, webController.getLists)
  router.get('/listOfAllTasks', webController.getListOfAllTasks)
  router.get('/listOfTodayTasks', webController.getListOfTodayTasks)
  router.get('/list/:listId', webController.getList)
  router.post('/list', webController.findUser, webController.createList, webController.getLists)
  router.patch('/list', webController.findUser, webController.modifyList, webController.getLists)
  router.delete('/list/:id', webController.findUser, webController.deleteList, webController.getLists)

  /* ----- Task ----- */
  router.get('/list/:listId/task/all', webController.getTasks)
  router.post('/list/:listId/task', webController.addTask)
  router.delete('/list/:listId/task/:taskId', webController.deleteTask, webController.getTasks)
  router.patch('/list/:listId/task/:taskId', webController.updateTask, webController.getTasks)
  router.get('/task/:taskId', webController.getTask)
  router.get('/taskStatistics/:date', webController.findUser, webController.getTaskStatistics)

  /* ----- Pomodoro ----- */
  router.get('/pomodoro', webController.getPomodoro)
  router.get('/taskCountdown/:taskId', webController.getTaskCountdown)
  router.patch('/pomodoro/duration', )

  app.use('/web/api', router)
}
