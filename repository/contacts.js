const shortId = require('shortid');
const db = require('../db');

class ContactsRepository {
  listContacts() {
    return db.get('contacts').value()
    };

  getContactById(contactId) {
    return db
      .get('contacts')
      .find(({ id }) => id === contactId)
      .value()
    };

  removeContact(contactId) {
    const [record] = db.get('contacts').remove({ id: contactId }).write()

    return record
    };

  addContact(body) {
    const newContact = {
          id: shortId(),
          ...body,
    }

    db.get('contacts').push(newContact).write()
    return newContact
    };

  updateContact(contactId, body) {
    const updatedContact = db
      .get('contacts')
      .find(({ id }) => id === contactId)
      .assign(body)
      .value()

    db.write()
    return updatedContact
    };
};

module.exports = { ContactsRepository };