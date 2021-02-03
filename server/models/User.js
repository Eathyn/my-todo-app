const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
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
    default: 'user',
  },
  lists: [{ type: Schema.Types.ObjectId, ref: 'List' }],
})

module.exports = mongoose.model('User', userSchema)
