const path = require('path')
require('dotenv').config()
const { v4: uuidv4 } = require('uuid')
const multer = require('multer')

const UPLOAD_DIR = path.resolve('./tmp')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR)
  },
  filename: function (req, file, cb) {
    const [, extension] = file.originalname.split('.')
    cb(null, `${uuidv4()}.${extension}`)
  },
})

const uploadMiddleware = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, true)
      return
    }
    cb(null, false)
  },
})

module.exports = {
  uploadMiddleware
}
