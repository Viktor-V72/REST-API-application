const jwt = require('jsonwebtoken')

const { NotAuthorizedError } = require('./errors')

const authMiddleware = (req, res, next) => {
  try {
    // TODO: validate token type later
    // eslint-disable-next-line dot-notation
    const [, token] = req.headers['authorization'].split(' ')

    if (!token) {
      next(new NotAuthorizedError('Please, provide a token'))
    }

    const user = jwt.decode(token, process.env.JWT_SECRET)
    req.token = token
    req.user = user
    next()
  } catch (err) {
    next(new NotAuthorizedError('Invalid token'))
  }
}

module.exports = {
  authMiddleware
}
