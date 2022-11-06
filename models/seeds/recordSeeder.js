const Record = require('../record')
const db = require('../../config/mongoose')
const recordSeed = require('./record.json').results

db.once('open', () => {
  console.log('mongodb connected!')
  Record.create(recordSeed)
    .then(() => {
      console.log('RecordSeeder done!')
      db.close()
    })
    .catch(err => console.log(err))
})