const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
mongoose.connect('mongodb://mongo1:27017,mongo2:27017,mongo3:27017/urls')

const db = mongoose.connection

db.on('error', (err) => {
  console.log('Mongoose 連線失敗：' + err)
})

db.once('open', () => {
  console.log('Mongoose 連線成功')
})

module.exports = db