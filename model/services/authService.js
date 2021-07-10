const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const { nanoid } = require('nanoid')

const { User } = require('../db/userModel')
const { NotAuthorizedError } = require('../assets/errors')

const registration = async (email, password) => {
  const verifyToken = nanoid()
  const user = new User({
    email, password, verifyToken
  })

  await user.save()

  const msg = {
    to: user.email,
    from: 'viktor2572@gmail.com',
    subject: 'Registration Confirmation',
    text: `Please, <a href="http://localhost:3000/api/users/verify/${verifyToken}">confirm</a> your email`,
    html: `<strong>Please, <a href="http://localhost:3000/api/users/verify/${verifyToken}">confirm</a> your email</strong>`,
  }
  await sgMail.send(msg)
}

const login = async (email, password) => {
  const user = await User.findOne({ email, verify: true })
  if (!user) {
    throw new NotAuthorizedError('Email or password is wrong')
  }

  if (!await bcrypt.compare(password, user.password)) {
    throw new NotAuthorizedError('Email or password is wrong')
  }

  const token = jwt.sign({
    _id: user._id,
    createdAt: user.createdAt
  }, process.env.JWT_SECRET)

  await User.findByIdAndUpdate(user._id, { token })

  return token
}

const logout = async (id, token) => {
  await User.findOneAndUpdate(
    { _id: id, token },
    { token: null }
  )
}

const currentUser = async (id, token) => {
  const data = await User.findOne({ _id: id, token })
  if (!data) {
    throw new NotAuthorizedError('Not authorized')
  }

  return data
}

const updateAvatar = async (id, token, url) => {
  const data = await User.findByIdAndUpdate({ _id: id, token }, { avatarURL: url })
  return data
}

const verifyToken = async(token) => {
  const user = await User.findOne({ verifyToken: token })
  if (!user) {
    throw new NotAuthorizedError('this link has expired')
  }
  await user.updateOne({ verify: true, verifyToken: null })
  return true
}

const resendVerifyToken = async(email) => {
  const user = await User.findOne({ email, verify: false })
  if (!user) {
    throw new NotAuthorizedError('Verification has already been passed')
  }
  const msg = {
    to: user.email,
    from: 'viktor2572@gmail.com',
    subject: 'Registration Confirmation',
    text: `Please, <a href="http://localhost:3000/api/users/verify/${user.verifyToken}">confirm</a> your email`,
    html: `<strong>Please, <a href="http://localhost:3000/api/users/verify/${user.verifyToken}">confirm</a> your email</strong>`,
  }
  await sgMail.send(msg)
}

module.exports = {
  registration,
  login,
  logout,
  currentUser,
  updateAvatar,
  verifyToken,
  resendVerifyToken
}
