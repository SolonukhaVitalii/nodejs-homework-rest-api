const { ContactsRepository } = require('../repository/contacts');

class ContactsServices {
  constructor() {
    this.contactsRepository = new ContactsRepository()
    };

  listContacts() {
    return this.contactsRepository.listContacts()
    };

  getContactById({ contactId }) {
    return this.contactsRepository.getContactById(contactId)
    };

  removeContact({ contactId }) {
    return this.contactsRepository.removeContact(contactId)
    };

  addContact(body) {
    return this.contactsRepository.addContact(body)
    };

  updateContact({ contactId }, body) {
    return this.contactsRepository.updateContact(contactId, body)
    };
};

module.exports = { ContactsServices };