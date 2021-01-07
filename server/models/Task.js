const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
  name: {
    type: String,
  },
  date: {
    year: {
      type: Number,
    },
    month: {
      type: Number,
    },
    day: {
      type: Number,
    },
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
})

module.exports = mongoose.model('Task', taskSchema)
