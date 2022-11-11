const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

// setting new page
router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(categories => {
      res.render('new', { categories })
    })
    .catch(error => console.log(error))
})
// create record
router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, date, categoryId, amount } = req.body
  return Record.create({
    name,
    date,
    categoryId,
    amount,
    userId
  })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

// setting edit page
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const categories = []
  Category.find()
    .lean()
    .then(category => categories.push(...category))
    .catch(error => console.error(error))
  Record.findOne({ _id, userId })
    .lean()
    .then(record => {
      categories.forEach(category => {
        if (category.id === record.categoryId) {
          category.selected = true
        }
      })
      res.render('edit', { record, categories })
    })
    .catch(error => console.error(error))
})
// update record
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Record.findByIdAndUpdate({ _id, userId }, req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// delete record
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router