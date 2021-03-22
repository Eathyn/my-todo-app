const mongoose = require('mongoose')

const countdownSchema = mongoose.Schema({
  duration: {
    type: Object,
    default: {
      hour: 0,
      minute: 50,
      second: 0,
    },
  }
})

module.exports = mongoose.model('Countdown', countdownSchema)
