const { Contact } = require('../db/contactmodel')

const getContactsController = async (req, res, next) => {
  try {
    const contacts = await Contact.find({})
    res.status(200).json({ contacts })
  } catch (error) {
    next(error)
  }
}

const getContactByIdController = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.contactId)
    if (!contact) {
      res.status(404).json({ message: 'Not found' })
    }
    res.status(200).json({ contact })
  } catch (error) {
    next(error)
  }
}

const addContactController = async (req, res, next) => {
  try {
    const contact = new Contact(req.body)
    await contact.save()
    if (!contact) {
      res.status(400).json({ message: 'missing required name field' })
    }
    res.status(201).json({ contact })
  } catch (error) {
    next(error)
  }
}

const deleteContactController = async (req, res, next) => {
  try {
    const result = await Contact.findByIdAndRemove(req.params.contactId)
    if (!result) {
      res.status(404).json({ message: 'Not found' })
    }
    res.status(200).json({ message: 'contact deleted' })
  } catch (error) {
    next(error)
  }
}

const changeContactController = async (req, res, next) => {
  const { name, email, phone } = req.body
  try {
    const result = await Contact.findByIdAndUpdate(req.params.contactId, { name, email, phone })
    if (!result) {
      res.status(400).json({ message: 'missing fields' })
    }
    if (result) {
      res.status(200).json({ result })
    } else {
      res.status(404).json({ message: 'Not found' })
    }
  } catch (error) {
    next(error)
  }
}

const updateStatusContactController = async (req, res, next) => {
  const { favorite = false } = req.body
  try {
    const result = await Contact.findByIdAndUpdate(req.params.contactId, { favorite })
    if (!result) {
      res.status(400).json({ message: 'missing field favorite' })
    }
    if (result) {
      res.status(200).json({ result })
    } else {
      res.status(404).json({ message: 'Not found' })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  changeContactController,
  updateStatusContactController
}
