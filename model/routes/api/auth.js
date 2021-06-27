const express = require('express')
const router = express.Router()

const {
  registrationController,
  loginController,
  logoutController,
  currentUserController
} = require('../../controllers/authController')

const {
  signupValidation,
  loginValidation,
} = require('../../assets/validationUsers')

const {
  authMiddleware,
} = require('../../assets/authMiddleware')

router.post('/signup', signupValidation, registrationController)
router.post('/login', loginValidation, loginController)
router.post('/logout', authMiddleware, logoutController)
router.get('/current', authMiddleware, currentUserController)

module.exports = router
