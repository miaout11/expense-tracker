const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')

const routes = require('./routes')
const userPassport = require('./config/passport')
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
// setting express-session
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

userPassport(app)

// setting res.locals
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

app.use(routes)

app.listen(port, () => {
  console.log(`Express web app is runing on http://locallhost:${port}`)
})