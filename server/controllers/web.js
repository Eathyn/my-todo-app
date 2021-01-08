const jwt = require('jsonwebtoken')
const User = require('../models/User')
const List = require('../models/List')
const Task = require('../models/Task')

/* ---------- User ---------- */

exports.register = async (req, res) => {
  // create a new user
  const user = await User.create(req.body)
  res.json(user)
}

exports.login = async (req, res) => {
  const { email, password } = req.body

  // search user by email
  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    return res.status(422).send({
      message: 'user doesn\'t exist'
    })
  }

  // verify
  const isValid = require('bcrypt').compareSync(password, user.password)
  if (!isValid) {
    return res.status(422).send({
      message: 'wrong password'
    })
  }

  // send token to client
  const jwt = require('jsonwebtoken')
  const token = jwt.sign({ id: user._id }, app.get('secret'))
  res.json({ token })
}

exports.findUser = async (req, res, next) => {
  const token = String(req.headers.authorization || '').split(' ').pop()
  const { id } = jwt.verify(token, app.get('secret'))
  req.user = await User.findById(id)
  await next()
}

exports.getUser = async (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  })
}

/* ---------- List ---------- */

exports.createList = async (req, res, next) => {
  const list = await List.create(req.body)
  await req.user.lists.push(list._id)
  await req.user.save()
  await next()
}

exports.getLists = async (req, res) => {
  const user = await User.populate(req.user, {
    path: 'lists',
    // populate: { path: 'tasks' },
  })
  const lists = user.lists.map(list => ({
    id: list['_id'],
    name: list['name'],
  }))
  res.json(lists)
}

exports.modifyList = async (req, res, next) => {
  const listItem = req.body

  const list = await List.findById(listItem.id)
  list.name = listItem.name
  await list.save()

  await next()
}

exports.deleteList = async (req, res, next) => {
  const listId = req.params.id
  await List.findByIdAndDelete(listId)

  await next()
}

/* ---------- Task ---------- */

exports.getTasks = async (req, res) => {
  let list = await List.findById(req.params.listId)
  list = await List.populate(list, 'tasks')

  const tasks = list.tasks.map(task => ({
    id: task['_id'],
    name: task['name'],
  }))

  res.json(tasks)
}

exports.addTask = async (req, res) => {
  let list = await List.findById(req.params.listId)
  const task = await Task.create(req.body)
  await list.tasks.push(task._id)
  await list.save()

  list = await List.populate(list, 'tasks')

  const tasks = list.tasks.map(task => ({
    id: task['_id'],
    name: task['name'],
  }))

  res.json(tasks)
}

exports.deleteTask = async (req, res, next) => {
  const listId = req.params.listId
  const taskId = req.params.taskId

  // delete task id reference from list.tasks
  const list = await List.findById(listId)
  const index = list.tasks.indexOf(taskId)
  list.tasks.splice(index, 1)
  await list.save()

  // delete task from tasks
  await Task.findByIdAndDelete(taskId)

  next()
}

exports.getTask = async (req, res) => {
  const taskId = req.params.taskId

  // get the task
  const task = await Task.findById(taskId)

  // filter and rename task properties
  const modifiedTask = {
    name: task['name'],
    options: task['options'],
    id: task['_id'],
  }

  // send the modified task back to client
  res.json(modifiedTask)
}

exports.updateTask = async (req, res, next) => {
  const taskId = req.params.taskId

  // update task
  await Task.findByIdAndUpdate(taskId, req.body)

  next()
}
