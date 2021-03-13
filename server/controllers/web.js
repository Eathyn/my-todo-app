const jwt = require('jsonwebtoken')
const User = require('../models/User')
const List = require('../models/List')
const Task = require('../models/Task')

/* ---------- User ---------- */

exports.register = async (req, res) => {
  const email = req.body.email

  const isRegistered = await User.findOne({ email })
  if (isRegistered) {
    return res.status(422).json({
      message: '用户已注册',
    })
  }

  try {
    const date = new Date()
    const formatted = `${date.getFullYear().toString()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
    const listToday = await List.create({
      name: '今天',
      tasks: [],
      date: formatted,
    })
    await User.create({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      role: 'user',
      listTodayId: listToday._id,
    })
  } catch (e) {
    return res.status(500).json({
      message: '服务器出错'
    })
  }
  return res.status(200).json({
    message: '用户注册成功'
  })
}

exports.login = async (req, res) => {
  const { email, password } = req.body

  // search user by email
  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    return res.status(403).send({
      message: '用户不存在'
    })
  }

  // verify
  const isValid = require('bcrypt').compareSync(password, user.password)
  if (!isValid) {
    return res.status(401).send({
      message: '密码错误'
    })
  }

  // send token to client
  const token = jwt.sign({ id: user._id }, app.get('secret'))
  res.json({ token })
}

exports.findUser = async (req, res, next) => {
  const token = String(req.headers.authorization || '').split(' ').pop()
  const { id } = jwt.verify(token, app.get('secret'))

  try {
    const user = await User.findById(id)
    if (!user) {
      return res.status(422).json({
        message: '用户非法'
      })
    }
    req.user = user
    await next()
  } catch (e) {
    return res.status(500).json({
      message: '服务器出错'
    })
  }
}

exports.getUserInfo = async (req, res) => {
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
  const user = await User.populate(req.user, { path: 'lists' })
  const lists = user.lists.map(list => ({
    id: list._id,
    name: list.name,
  }))
  res.json(lists)
}

exports.getList = async (req, res) => {
  let listId = req.params.listId
  let list = await List.findById(listId)

  if (list.name === '所有') {
    const listOfAllTasks = await List.findById(listId)
    listOfAllTasks.tasks = []

    const tasks = await Task.find({})
    for (const task of tasks) {
      listOfAllTasks.tasks.push(task._id)
    }

    list = await List.findByIdAndUpdate(listId, { tasks: listOfAllTasks.tasks })
  } else if (list.name === '今天') {
    let listOfTodayTasks = list

    // get date of today of yyyy-mm-dd format
    let dateOfToday = new Date()
    const dd = dateOfToday.getDate().toLocaleString().padStart(2, '0')
    const mm = (dateOfToday.getMonth() + 1).toLocaleString().padStart(2, '0')
    const yyyy = dateOfToday.getFullYear()
    dateOfToday = `${yyyy}-${mm}-${dd}`

    if (list.date !== dateOfToday) {
      // delete list
      await List.findByIdAndDelete(listId)

      // create a new list
      listOfTodayTasks = await List.create({
        name: '今天',
        date: dateOfToday,
        tasks: [],
      })

      listId = listOfTodayTasks._id
    } else {
      listOfTodayTasks.tasks = []
    }

    // push task id and save
    const tasks = await Task.find({})
    for (const task of tasks) {
      if (task.options && task.options.date === dateOfToday) {
        listOfTodayTasks.tasks.push(task._id)
      }
    }
    await listOfTodayTasks.save()
  }

  const populatedList = await List.findById(listId).populate('tasks')

  const filteredTasks = await populatedList.tasks.map(task => ({
    id: task._id,
    name: task.name,
    isCompleted: task.isCompleted,
    pomodoroAmount: task.pomodoroAmount,
    options: task.options,
  }))

  const filteredList = {
    name: populatedList.name,
    id: populatedList._id,
    tasks: filteredTasks,
  }

  res.json(filteredList)
}

exports.modifyList = async (req, res, next) => {
  const listItem = req.body

  const list = await List.findById(listItem.id)
  list.name = listItem.name
  await list.save()

  await next()
}

exports.deleteList = async (req, res, next) => {
  const userId = req.user._id
  const listId = req.params.id

  // delete list id in user document
  const user = await User.findById(userId)
  const listLen = user.lists.length
  for (let i = 0; i < listLen; i++) {
    // note: typeof user.lists[i] === 'object'
    if (user.lists[i].toString() === listId) {
      user.lists.splice(i, 1)
      break
    }
  }
  user.save()

  // delete list and tasks in that list
  const list = await List.findById(listId).populate('tasks')
  for (const task of list.tasks) {
    await Task.findByIdAndDelete(task._id)
  }
  await List.findByIdAndDelete(listId)
  await next()
}

/* ---------- Task ---------- */

exports.getTasks = async (req, res) => {
  let list = await List.findById(req.params.listId)
  list = await List.populate(list, 'tasks')

  const tasks = list.tasks.map(task => ({
    id: task._id,
    name: task.name,
    isCompleted: task.isCompleted,
    pomodoroAmount: task.pomodoroAmount,
    options: task.options,
  }))

  res.json(tasks)
}

exports.addTask = async (req, res) => {
  const listId = req.params.listId
  // create task and push task id into list
  const task = await Task.create(req.body)
  const list = await List.findById(listId)
  list.tasks.push(task._id)
  await list.save()

  // filter task properties
  const listPopulated = await List.populate(list, 'tasks')
  const tasks = listPopulated.tasks.map(task => {
    return {
      id: task._id,
      name: task.name,
    }
  })
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
  const task = await Task.findById(taskId)

  // filter and rename task properties
  const modifiedTask = {
    id: task['_id'],
    name: task['name'],
    isCompleted: task.isCompleted,
    pomodoroAmount: task.pomodoroAmount,
    options: task['options'],
    focusTime: task.focusTime,
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

const pomodoro = {
  minute: 1,
  second: 0,
}

exports.getPomodoro = async (req, res) => {
  res.json(pomodoro)
}

exports.getTaskCountdown = async (req, res) => {
  const taskId = req.params.taskId

  // get the task
  const task = await Task.findById(taskId)

  //filter and rename task properties
  const modifiedTask = {
    name: task['name'],
    id: task['_id'],
  }

  // send to client
  res.json(modifiedTask)
}

exports.getListOfTodayTasks = async (req, res) => {
  const { listTodayId } = req.user
  const date = new Date()
  const formattedDate = `${date.getFullYear().toString()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
  // clean all task ids in list and push ids of today task
  const listToday = await List.findByIdAndUpdate(listTodayId, { date: formattedDate, tasks: [] })
  console.log(listToday)
  const tasks = await Task.find({ 'options.date': formattedDate })
  for (const task of tasks) {
    Array.prototype.push.call(listToday.tasks, task._id)
  }
  await listToday.save()
  res.send({
    id: listToday._id,
    name: listToday.name,
    date: listToday.date,
  })
}

exports.getTaskStatistics = async (req, res) => {
  const date = req.params.date
  const user = req.user
  const taskStatistics = []
  let listOfAllTasks

  // get list of all tasks
  for (const listId of user.lists) {
    const list = await List.findById(listId)
    if (list.name === '所有') {
      listOfAllTasks = list
    }
  }

  const list = await List.populate(listOfAllTasks, 'tasks')
  const tasks = list.tasks.map(task => ({
    name: task.name,
    isCompleted: task.isCompleted,
    options: task.options,
    focusTime: task.focusTime,
  }))

  for (const task of tasks) {
    if (task.options.date && task.options.date === date) {
      taskStatistics.push(task)
    }
  }

  res.send(taskStatistics)
}

/* ----- Countdown ----- */
exports.getCountdownLists = async (req, res) => {
  const user = await User.populate(req.user, { path: 'lists' })
  const lists = user.lists.map(list => {
    return {
      id: list._id,
      name: list.name,
    }
  })
  let listOfToday = await List.findById(req.user.listTodayId)
  const { _id: id, name } = listOfToday
  listOfToday = { id, name }
  lists.unshift(listOfToday)
  res.json(lists)
}

exports.getCountdownTasks = async (req, res) => {
  const listId = req.params.listId
  let list = null
  let tasks = null

  list = listId === req.user.listTodayId ?
    await List.populate(await List.findById(req.user.listTodayId), 'tasks') :
    await List.populate(await List.findById(listId), 'tasks')
  tasks = list.tasks.map(task => {
    return {
      id: task._id,
      name: task.name,
    }
  })
  res.json(tasks)
}
