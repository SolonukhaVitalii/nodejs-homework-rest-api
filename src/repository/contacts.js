const Contact = require('../schemas/schema-contact');

class ContactsRepository {
  constructor() {
    this.contactModel = Contact;
  }

  async listContacts(userId, { limit = 10, page = 1, favorite }) {
    const result = await this.contactModel.paginate(
      { owner: userId },
      {
        limit,
        page,
        populate: {
          path: 'owner',
          select: 'subscription email -_id',
        },
      },
      (err, result) => {
        if (favorite) {
          return {
            ...result,
            docs: result.docs.filter(item => item.favorite === true),
          };
        }
        return result;
      },
    );
    return result;
  }

  async getContactById(userId, contactId) {
    const result = await this.contactModel
      .findById({ _id: contactId, owner: userId })
      .populate({
        path: 'owner',
        select: 'subscription email -_id',
      });
    return result;
  }

  async removeContact(userId, contactId) {
    const record = await this.contactModel.findByIdAndRemove(contactId, {
      owner: userId,
    });

    return record;
  }

  async addContact(userId, body) {
    const newContact = await this.contactModel.create({
      ...body,
      owner: userId,
    });

    return newContact;
  }

  async updateContact(userId, contactId, body) {
    const updatedContact = await this.contactModel.findByIdAndUpdate(
      { _id: contactId, owner: userId },
      { ...body },
      { new: true },
    );
    return updatedContact;
  }

  async updateContactStatus(userId, contactId, body) {
    const updatedContact = await this.contactModel.findByIdAndUpdate(
      { _id: contactId, owner: userId },
      { ...body },
      { new: true },
    );
    return updatedContact;
  }
}

module.exports = { ContactsRepository };