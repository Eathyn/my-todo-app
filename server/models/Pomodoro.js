const mongoose = require('mongoose')

const pomodoroSchema = mongoose.Schema({
  targetAmount: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 30,
  },
})

module.exports = mongoose.model('Pomodoro', pomodoroSchema)
