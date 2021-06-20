const express = require('express')
const router = express.Router()

const {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  changeContactController,
  updateStatusContactController
} = require('../../controllers/contactsController')

const { addContactValidation, patchPostValidation, patchStatusValidation } = require('../../assets/validationContacts')

router.get('/', getContactsController)

router.get('/:contactId', getContactByIdController)

router.post('/', addContactValidation, addContactController)

router.delete('/:contactId', deleteContactController)

router.patch('/:contactId', patchPostValidation, changeContactController)

router.patch('/:contactId/favorite', patchStatusValidation, updateStatusContactController)

module.exports = router
