const express = require('express')
  app = express()
  router = express.Router()
  port = 3000

// for jwt
app.set('secret', 'todo-app')

app.use(require('cors')())
app.use(
  express.urlencoded({
    extended: false
  })
)
app.use(express.json())

require('./plugins/db')(app)
require('./routes/web')(app)

app.use('/', router)

app.listen(port, () => {
  console.log(`server running on port ${port}...`)
})
