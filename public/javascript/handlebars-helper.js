const handlebars = require('handlebars')
const Category = require('../../models/category')
const categories = []
Category.find()
  .lean()
  .then(category => categories.push(...category))

const getIcon = handlebars.registerHelper('getIcon', function (num) {
  const icon = categories.find(data => data.id === num)
  return icon.icon
})
module.exports = getIcon