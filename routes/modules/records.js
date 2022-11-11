const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

// setting new page
router.get('/new', (req, res) => {
  const categoryId = Number(req.query.categorySelector)
  const categories = []
  Category.find()
    .lean()
    .then(category => categories.push(...category))
    .then(categories.forEach(category => {
      if (category.id === categoryId) {
        category.selected = true
      }
    }))
  return res.render('new', { categories })
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
  return Record.findOne({ _id, userId })
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(error => console.log(error))
})
// update record
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOneAndUpdate({ _id, userId }, req.body, { returnNewDocument: true })
    .then(() => res.redirect(`/records/${_id}`))
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