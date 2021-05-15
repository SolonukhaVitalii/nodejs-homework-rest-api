const { ContactsRepository } = require('../repository/contacts');

class ContactsServices {
  constructor() {
    this.contactsRepository = new ContactsRepository();
  }

  async listContacts(userId, query) {
    return await this.contactsRepository.listContacts(userId, query);
  }

  async getContactById(userId, { contactId }) {
    return await this.contactsRepository.getContactById(userId, contactId);
  }

  async removeContact(userId, { contactId }) {
    return await this.contactsRepository.removeContact(userId, contactId);
  }

  async addContact(userId, body) {
    return await this.contactsRepository.addContact(userId, body);
  }

  async updateContact(userId, { contactId }, body) {
    return await this.contactsRepository.updateContact(userId, contactId, body);
  }

  async updateContactStatus(userId, { contactId }, body) {
    return await this.contactsRepository.updateContactStatus(
      userId,
      contactId,
      body,
    );
  }
}

module.exports = { ContactsServices };