const { ContactsRepository } = require('../repository/contacts');

class ContactsServices {
  constructor() {
    this.contactsRepository = new ContactsRepository();
  }

  async listContacts() {
    return await this.contactsRepository.listContacts();
  }

  async getContactById({ contactId }) {
    return await this.contactsRepository.getContactById(contactId);
  }

  async removeContact({ contactId }) {
    return await this.contactsRepository.removeContact(contactId);
  }

  async addContact(body) {
    return await this.contactsRepository.addContact(body);
  }

  async updateContact({ contactId }, body) {
    return await this.contactsRepository.updateContact(contactId, body);
  }

  async updateContactStatus({ contactId }, body) {
    return await this.contactsRepository.updateContactStatus(contactId, body);
  }
}

module.exports = { ContactsServices };