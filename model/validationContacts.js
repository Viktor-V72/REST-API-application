const Joi = require('joi')

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru', 'ua'] } })
        .required(),
      phone: Joi.string()
        .alphanum()
        .min(10)
        .max(15)
        .required(),
    })

    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details })
    }

    next()
  },

  patchPostValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .optional(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .optional(),
      phone: Joi.number()
        .integer()
        .min(10)
        .max(15)
        .optional(),
    })

    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details })
    }

    next()
  },
}
