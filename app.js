const express = require('express')
const exphbs = require('express-handlebars')

require('./config/mongoose')

const app = express()
const port = 3000

// view template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`this web app is runing on http://locallhost:${port}`)
})