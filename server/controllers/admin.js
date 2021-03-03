const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')
const User = require('../models/User')
const List = require('../models/List')
const Task = require('../models/Task')
const bcrypt = require('bcrypt')

/* ---------------- Admin ----------------- */

exports.register = async (req, res) => {
  const email = req.body.email

  const isRegistered = await Admin.findOne({ email })
  if (isRegistered) {
    return res.status(422).json({
      message: '管理员已注册',
    })
  } else {
    const admin = await Admin.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: 'admin',
    })
    res.send(admin)
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body

  // search admin by email
  const admin = await Admin.findOne({ email }).select('+password')
  if (!admin) {
    return res.status(422).send({
      message: 'admin doesn\'t exist'
    })
  }

  // verify
  const isValid = bcrypt.compareSync(password, admin.password)
  if (!isValid) {
    return res.status(422).send({
      message: 'wrong password'
    })
  }

  const token = jwt.sign({ id: admin._id }, app.get('secret'))
  res.json({
    token,
    adminId: admin._id
  })
}

/* ---------- User Management ---------- */

exports.addUser = async (req, res) => {
  const { email, name, password } = req.body
  await User.create({
    email,
    name,
    password,
  })

  return res.status(200).json({
    message: '用户创建成功'
  })
}

exports.getAllUsers = async (req, res) => {
  let users = await User.find({})

  // filter some needless properties
  users = users.map(user => ({
    id: user._id,
    email: user.email,
    name: user.name,
  }))
  res.send(users)
}

exports.deleteUser = async (req, res, next) => {
  const userId = req.params.id
  const user = await User.findById(userId).populate('lists')
  for (const list of user.lists) {
    for (const task of list.tasks) {
      await Task.findByIdAndDelete(task._id)
    }
    await List.findByIdAndDelete(list._id)
  }
  await User.findByIdAndDelete(userId)
  next()
}

exports.getUser = async (req, res) => {
  const userId = req.params.id

  const user = await User.findById(userId)
  const userFiltered = {
    id: user._id,
    email: user.email,
    name: user.name,
  }
  res.send(userFiltered)
}

exports.modifyUser = async (req, res) => {
  const userId = req.params.id
  const { email, name, password } = req.body

  if (password === '') {
    await User.findByIdAndUpdate(userId, {
      email,
      name,
    })
  } else {
    await User.findByIdAndUpdate(userId, {
      email,
      name,
      password,
    })
  }

  return res.status(200).json({
    message: '修改完成',
  })
}

/* ---------- Admin Management ---------- */

exports.addAdmin = async (req, res) => {
  const { email, name, password } = req.body
  await Admin.create({
    email,
    name,
    password,
  })

  return res.status(200).json({
    message: '管理员添加成功'
  })
}

exports.getAllAdmins = async (req, res) => {
  let admins = await Admin.find({})

  // filter some needless properties
  admins = admins.map(admin => ({
    id: admin._id,
    email: admin.email,
    name: admin.name,
  }))
  res.send(admins)
}

exports.deleteAdmin = async (req, res) => {
  const adminId = req.params.id
  await Admin.findByIdAndDelete(adminId)
  return res.status(200).json({
    message: '删除成功'
  })
}

exports.getAdmin = async (req, res) => {
  const adminId = req.params.id

  const admin = await Admin.findById(adminId)
  const adminFiltered = {
    id: admin._id,
    email: admin.email,
    name: admin.name,
  }
  res.send(adminFiltered)
}

exports.modifyAdmin = async (req, res) => {
  const adminId = req.params.id
  const { email, name, password } = req.body

  if (password === '') {
    await Admin.findByIdAndUpdate(adminId, {
      email,
      name,
    })
  } else {
    await Admin.findByIdAndUpdate(adminId, {
      email,
      name,
      password,
    })
  }

  return res.status(200).json({
    message: '修改完成',
  })
}

exports.modifyAdminEmail = async (req, res) => {
  const adminId = req.params.id
  const email = req.body

  await Admin.findByIdAndUpdate(adminId, email)
  return res.status(200).json({
    message: '邮箱修改成功',
  })
}

exports.modifyAdminName = async (req, res) => {
  const adminId = req.params.id
  const name = req.body

  await Admin.findByIdAndUpdate(adminId, name)
  return res.status(200).json({
    message: '名称修改成功'
  })
}

exports.modifyAdminPassword = async (req, res) => {
  const adminId = req.params.id
  const { currentPassword, newPassword } = req.body
  const admin = await Admin.findById(adminId).select('+password')

  const isValid = bcrypt.compareSync(currentPassword, admin.password)
  if (!isValid) {
    return res.status(422).send({
      message: '当前密码错误',
    })
  }

  await Admin.findByIdAndUpdate(adminId, { password: newPassword })
  return res.status(200).send({
    message: '密码修改成功',
  })
}
