const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
  name: {
    type: String,
  },
  options: {
    date: '',
    period: {
      startingTime: {
        type: String,
      },
      endTime: {
        type: String,
      },
    },
    duration: {
      type: Number,
    },
  }
})

module.exports = mongoose.model('Task', taskSchema)
