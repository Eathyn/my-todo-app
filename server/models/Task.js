const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
  name: {
    type: String,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  pomodoroAmount: {
    type: Number,
    default: 0,
  },
  options: {
    date: {
      type: String,
    },
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
