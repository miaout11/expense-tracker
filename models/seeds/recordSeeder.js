const Record = require('../record')
const User = require('../user')
const records = require('./record.json').results
const users = require('./user.json').results
const db = require('../../config/mongoose')

// use promise.all to create user and record seeder
db.once('open', async () => {
  // create user
  for (const [user_index, user] of users.entries()) {
    const userCreate = await User.create({
      ...user
    })
    // deal with user and record relation
    const userSeedRecord = []
    records.forEach((record, record_index) => {
      if (record_index >= 3 * user_index && record_index < 3 * (user_index + 1)) {
        record.userId = userCreate._id
        userSeedRecord.push(record)
      }
    })
    // create record
    await Record.create(userSeedRecord)
    console.log('user and record all created!')
  }
  console.log('done')
  process.exit()
})