const express = require('express')
const Controller = require('./controllers/controller')
const app = express()
const port = 3009

const router = require('./routes')

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.urlencoded({ extended: true }))
app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
