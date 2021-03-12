const mongoose = require('mongoose')
const { Schema } = mongoose

const listSchema = mongoose.Schema({
  name: {
    type: String,
  },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  date: {
    type: String,
  }
})

module.exports = mongoose.model('List', listSchema)
