const {
  registration,
  login,
  logout,
  currentUser
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

module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentUserController
}
