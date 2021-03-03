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
    await User.create({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      role: 'user',
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
  const user = await User.populate(req.user, {
    path: 'lists',
  })
  const lists = user.lists.map(list => ({
    id: list['_id'],
    name: list['name'],
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

    if (list.createdDate !== dateOfToday) {
      // delete list
      await List.findByIdAndDelete(listId)

      // create a new list
      listOfTodayTasks = await List.create({
        name: '今天',
        createdDate: dateOfToday,
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
  console.log(populatedList)

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
  const listId = req.params.id
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

exports.getListOfAllTasks = async (req, res) => {
  // send the list to client if found
  let listOfAllTasks = await List.findOne({ name: '所有' })

  // create the list of all tasks if doesn't exist
  if (!listOfAllTasks) {
    // create list
    listOfAllTasks = await List.create({
      name: '所有',
      tasks: [],
    })

    // find all lists
    const lists = await List.find({})

    // add all tasks to listOfAllTasks
    for (const list of lists) {
      let tasks = list.tasks
      for (const task of tasks) {
        listOfAllTasks.tasks.push(task)
      }
    }

    // save list
    await listOfAllTasks.save()
  }

  // filter some useless properties
  listOfAllTasks = {
    name: listOfAllTasks.name,
    id: listOfAllTasks._id,
  }

  res.json(listOfAllTasks)
}

exports.getListOfTodayTasks = async (req, res) => {
  const list = await List.findOne({ name: '今天' })

  if (!list) {  // list not found
    const dateOfToday = getDateOfToday()
    const listOfTodayTasks =  await createListOfTodayTasks(dateOfToday)
    await pushTasks(listOfTodayTasks, dateOfToday)

    res.json({
      id: listOfTodayTasks._id,
      name: listOfTodayTasks.name,
    })
  } else {  // list found
    const dateOfToday = getDateOfToday()

    if (list.createdDate === dateOfToday) {
      res.json({
        name: list.name,
        id: list._id,
      })
    } else {
      // delete list
      await List.findByIdAndDelete(list._id)

      const listOfTodayTasks = await createListOfTodayTasks(dateOfToday)
      await pushTasks(listOfTodayTasks, dateOfToday)

      res.json({
        name: listOfTodayTasks.name,
        id: listOfTodayTasks._id,
      })
    }
  }

  // get date of today with yyyy-mm-dd format
  function getDateOfToday() {
    let dateOfToday = new Date()
    const dd = dateOfToday.getDate().toLocaleString().padStart(2, '0')
    const mm = (dateOfToday.getMonth() + 1).toLocaleString().padStart(2, '0')
    const yyyy = dateOfToday.getFullYear()
    dateOfToday = `${yyyy}-${mm}-${dd}`

    return dateOfToday
  }

  // create a list which date is today
  async function createListOfTodayTasks(dateOfToday) {
    return await List.create({
      name: '今天',
      tasks: [],
      createdDate: dateOfToday,
    })
  }

  // push tasks which date is same with listOfTodayTasks
  async function pushTasks(listOfTodayTasks, dateOfToday) {
    let tasks = await Task.find({ 'options.date': dateOfToday })

    for (const task of tasks) {
      listOfTodayTasks.tasks.push(task._id)
    }

    await listOfTodayTasks.save()
  }
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
