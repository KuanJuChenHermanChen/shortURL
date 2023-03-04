const express = require('express')
const exphbs = require('express-handlebars')
require('./config/mongoose')
const routes = require('./routes')
const app = express()
const port = 3000

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})