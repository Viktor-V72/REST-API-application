const express = require('express')
const router = express.Router()

const { addContactValidation, patchPostValidation } = require('../../assets/validationContacts')

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
} = require('../../index')

router.get('/', async (req, res, next) => {
  try {
    const result = await listContacts()
    res.status(200).json({ result })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const result = await getContactById(req.params.contactId)
    if (!result) {
      res.status(404).json({ message: 'Not found' })
    }
    res.status(200).json({ result })
  } catch (error) {
    next(error)
  }
})

router.post('/', addContactValidation, async (req, res, next) => {
  try {
    const result = await addContact(req.body)
    if (!result) {
      res.status(400).json({ message: 'missing required name field' })
    }
    res.status(201).json({ result })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const result = await removeContact(req.params.contactId)
    if (!result) {
      res.status(404).json({ message: 'Not found' })
    }
    res.status(200).json({ message: 'contact deleted' })
  } catch (error) {
    next(error)
  }
})

router.patch('/:contactId', patchPostValidation, async (req, res, next) => {
  try {
    const result = await updateContact(req.params.contactId, req.body)
    if (!req.body) {
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
})

module.exports = router
