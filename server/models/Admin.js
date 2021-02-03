const mongoose = require('mongoose')
const { Schema } = mongoose

const adminSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
    set(val) {
      return require('bcrypt').hashSync(val, 10)
    },
  },
  role: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Admin', adminSchema)
