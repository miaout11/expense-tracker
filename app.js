const express = require('express')

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send(`This is a new web app!`)
})

app.listen(port, () => {
  console.log(`this web app is runing on http://locallhost:${port}`)
})