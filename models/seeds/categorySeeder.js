const Category = require('../category')
const categorySeed = require('./category.json').results
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('connected categorySeeder!')
  Category.insertMany(categorySeed)
    .then(() => {
      db.close()
      console.log('categorySeeder done!')
    })
    .catch(err => console.log(err))
})