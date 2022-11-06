const mongoose = require('mongoose')

// connect to mongoDB
mongoose.connect(process.env.MONGODB_ET_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// db connect status
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db
