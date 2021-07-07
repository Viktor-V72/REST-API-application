const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../db/userModel')
const { NotAuthorizedError } = require('../assets/errors')

const registration = async (email, password) => {
  const user = new User({
    email, password
  })
  await user.save()
}

const login = async (email, password) => {
  const user = await User.findOne({ email })

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

module.exports = {
  registration,
  login,
  logout,
  currentUser,
  updateAvatar
}
