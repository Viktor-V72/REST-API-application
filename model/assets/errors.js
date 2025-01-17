class commonError extends Error {
  constructor(message) {
    super(message)
    this.status = 400
  }
}

class ValidationError extends commonError {
  constructor(message) {
    super(message)
    this.status = 400
  }
}

class WrongParametersError extends commonError {
  constructor(message) {
    super(message)
    this.status = 400
  }
}

class NotAuthorizedError extends commonError {
  constructor(message) {
    super(message)
    this.status = 401
  }
}

module.exports = {
  commonError,
  ValidationError,
  WrongParametersError,
  NotAuthorizedError
}
