const { Contact } = require('../db/contactmodel')

const getContacts = async (owner) => {
  const contacts = await Contact.find({ owner })
  return contacts
}

const getContactById = async (contactId, owner) => {
  const contact = await Contact.findOne({ _id: contactId, owner })
  return contact
}

const addContact = async ({ name, email, phone }, owner) => {
  const contact = new Contact({ name, email, phone, owner })
  await contact.save()
  return contact
}

const deleteContact = async (contactId, owner) => {
  const result = await Contact.findOneAndRemove({ _id: contactId, owner })
  return result
}

const changeContact = async (contactId, { name, email, phone }, owner) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    { name, email, phone })
  return result
}

const updateStatusContact = async (contactId, { favorite }, owner) => {
  const result = await Contact.findOneAndUpdate({ _id: contactId, owner }, { favorite })
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
