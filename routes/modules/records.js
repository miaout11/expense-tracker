const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

// serring new page
router.get('/new', (req, res) => {
  res.render('new')
})
// create record
router.post('/', (req, res) => {
  const { name, date, categoryID, amount } = req.body
  return Record.create({
    name,
    date,
    categoryID,
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