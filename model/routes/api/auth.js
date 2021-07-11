const express = require('express')
const router = express.Router()

const {
  registrationController,
  loginController,
  logoutController,
  currentUserController,
  avatarController,
  verificationController,
  resendVerificationController
} = require('../../controllers/authController')

const {
  signupValidation,
  loginValidation,
  resendValidation
} = require('../../assets/validationUsers')

const {
  authMiddleware,
} = require('../../assets/authMiddleware')

const {
  uploadMiddleware
} = require('../../assets/upload')

router.post('/signup', signupValidation, registrationController)
router.post('/login', loginValidation, loginController)
router.post('/logout', authMiddleware, logoutController)
router.get('/current', authMiddleware, currentUserController)
router.patch('/avatars', authMiddleware, uploadMiddleware.single('avatar'), avatarController)
router.get('/verify/:verificationToken', verificationController)
router.post('/verify', resendValidation, resendVerificationController)

module.exports = router
