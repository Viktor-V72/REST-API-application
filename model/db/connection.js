const mongoose = require('mongoose')

const connectMongo = async () => {
  return mongoose.connect(process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
}

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('Database connection successful')
})

module.exports = {
  connectMongo
}
