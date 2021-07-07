const path = require('path')
const fs = require('fs').promises
const jimp = require('jimp')

const IMG_DIR = path.resolve('./public/avatars')

const {
  registration,
  login,
  logout,
  currentUser,
  updateAvatar
} = require('../services/authService')

const registrationController = async (req, res, next) => {
  const {
    email,
    password
  } = req.body

  try {
    await registration(email, password)
    res.json({ status: 'success' })
  } catch (error) {
    next(error)
  }
}

const loginController = async (req, res, next) => {
  const {
    email,
    password
  } = req.body
  try {
    const user = await login(email, password)

    res.json({ status: 'success', email, token: user })
  } catch (error) {
    next(error)
  }
}

const logoutController = async (req, res, next) => {
  try {
    await logout(req.user._id, req.token)

    res.status(204).json({ })
  } catch (error) {
    next(error)
  }
}

const currentUserController = async (req, res, next) => {
  try {
    const user = await currentUser(req.user._id, req.token)
    const { email, subscription } = user

    res.status(200).json({ email, subscription })
  } catch (error) {
    next(error)
  }
}

const avatarController = async (req, res, next) => {
  try {
    if (req.file) {
      const { file } = req
      const img = await jimp.read(file.path)
      await img
        .autocrop()
        .cover(
          250,
          250,
          jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE,
        )
        .writeAsync(file.path)
      await fs.rename(file.path, path.join(IMG_DIR, file.originalname))
      const { avatarURL } = await updateAvatar(req.user._id, req.token, file.path)
      return res.json({ status: 'success', avatarURL })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentUserController,
  avatarController
}
