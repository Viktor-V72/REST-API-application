const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join('./model/contacts.json')

const shortid = require('shortid')

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath)

    return JSON.parse(data)
  } catch (error) {
    console.log(error)
  }
}

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath)

    const result = JSON.parse(data).find(({ id }) => id === Number(contactId))

    return result
  } catch (error) {
    console.log(error)
  }
}

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath)

    const result = JSON.parse(data).filter(
      ({ id }) => id !== Number(contactId)
    )

    const contactsList = JSON.stringify(result, null, '\t')

    await fs.writeFile(contactsPath, contactsList)

    return result
  } catch (error) {
    console.log(error)
  }
}

const addContact = async (body) => {
  try {
    const { name, email, phone } = body
    const data = await fs.readFile(contactsPath)

    const result = JSON.parse(data)

    const newContact = { id: shortid.generate(), name, email, phone }

    const contactsList = JSON.stringify([newContact, ...result], null, '\t')

    await fs.writeFile(contactsPath, contactsList)

    return JSON.parse(contactsList)
  } catch (error) {
    console.log(error)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsPath)
    let currentContact = null

    const newContacts = JSON.parse(data).map((item) => {
      if (item.id.toString() === contactId.toString()) {
        const updated = { ...item, ...body }
        currentContact = updated
        return updated
      }
      return item
    })

    const updatedList = JSON.stringify(newContacts, null, '\t')

    await fs.writeFile(contactsPath, updatedList)

    return currentContact
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
