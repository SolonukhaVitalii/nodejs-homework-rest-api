const Contact = require('../schemas/schema-contact');

class ContactsRepository {
  constructor() {
    this.contactModel = Contact;
  }

  async listContacts() {
    const result = await this.contactModel.find({});
    console.log(result);
    return result;
  }

  async getContactById(contactId) {
    const result = await this.contactModel.findOne({ _id: contactId });
    return result;
  }

  async removeContact(contactId) {
    const record = await this.contactModel.findByIdAndRemove({
      _id: contactId,
    });

    return record;
  }

  async addContact(body) {
    const newContact = await this.contactModel.create(body);

    return newContact;
  }

  async updateContact(contactId, body) {
    const updatedContact = await this.contactModel.findByIdAndUpdate(
      {
        _id: contactId,
      },
      { ...body },
      { new: true },
    );
    return updatedContact;
  }

  async updateContactStatus(contactId, body) {
    const updatedContact = await this.contactModel.findByIdAndUpdate(
      {
        _id: contactId,
      },
      { ...body },
      { new: true },
    );
    return updatedContact;
  }
}

module.exports = { ContactsRepository };