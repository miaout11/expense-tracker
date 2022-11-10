const express = require('express')
const exphbs = require('express-handlebars')

const routes = require('./routes')

require('./config/mongoose')

const app = express()
const port = 3000

// view template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// setting body parser
app.use(express.urlencoded({ extended: true }))
// setting static files
app.use(express.static('public'))

app.use(routes)

app.listen(port, () => {
  console.log(`Express web app is runing on http://locallhost:${port}`)
})