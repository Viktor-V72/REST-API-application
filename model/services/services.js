const { Contact } = require('../db/contactmodel')

const getContacts = async () => {
  const contacts = await Contact.find({})
  return contacts
}

const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId)
  return contact
}

const addContact = async ({ name, email, phone }) => {
  const contact = new Contact({ name, email, phone })
  await contact.save()
  return contact
}

const deleteContact = async (contactId) => {
  const result = await Contact.findByIdAndRemove(contactId)
  return result
}

const changeContact = async (contactId, { name, email, phone }) => {
  const result = await Contact.findByIdAndUpdate(contactId, { name, email, phone })
  return result
}

const updateStatusContact = async (contactId, { favorite }) => {
  const result = await Contact.findByIdAndUpdate(contactId, { favorite })
  return result
}

module.exports = {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  changeContact,
  updateStatusContact
}
