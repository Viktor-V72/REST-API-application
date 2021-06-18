const app = require('../app')
const { connectMongo } = require('../model/db/connection')

const PORT = process.env.PORT || 3000

const start = async () => {
  try {
    await connectMongo()

    app.listen(PORT, () => {
      console.log('Database connection successful')
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  } catch (err) {
    console.error(`Failed to launch application with error: ${err.message}`)
    process.exit(1)
  }
}

start()
