const Joi = require('joi')

module.exports = {
  signupValidation: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru', 'ua'] } })
        .required(),
      password: Joi.string()
        .alphanum()
        .min(6)
        .max(10)
        .required(),
    })

    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details })
    }

    next()
  },

  loginValidation: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru', 'ua'] } })
        .required(),
      password: Joi.string()
        .alphanum()
        .min(6)
        .max(10)
        .required(),
    })

    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details })
    }

    next()
  },

}
