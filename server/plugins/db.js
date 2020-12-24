module.exports = app => {
  const mongoose = require('mongoose')

  mongoose.connect(
    "mongodb://localhost:27017/my-todo-app",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )

  mongoose.connection.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
  })
}
