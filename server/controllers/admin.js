const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')

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
  const isValid = require('bcrypt').compareSync(password, admin.password)
  if (!isValid) {
    return res.status(422).send({
      message: 'wrong password'
    })
  }

  // send token to client
  const token = jwt.sign({ id: admin._id }, app.get('secret'))
  res.send({
    token,
    name: admin.name,
  })
}
