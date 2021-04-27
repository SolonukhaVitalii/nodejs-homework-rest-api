const { httpCodes } = require('../helpers/code');
const { ContactsServices } = require('../services/contacts');

const contactsServices = new ContactsServices();

const listContacts = (req, res, next) => {
  try {
    const contacts = contactsServices.listContacts();
    res.status(httpCodes.OK).json({
      status: 'success',
      code: httpCodes.OK,
      data: {
        contacts,
      },
    });
  } catch (e) {
    next(e);
  }
};

const getContactById = (req, res, next) => {
  try {
    const contact = contactsServices.getContactById(req.params);
    if (contact) {
      res.status(httpCodes.OK).json({
        status: 'success',
        code: httpCodes.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: httpCodes.NOT_FOUND,
        message: 'Contact not found',
        data: 'Not Found',
      });
    }
  } catch (e) {
    next(e);
  }
};

const removeContact = (req, res, next) => {
  try {
    const contact = contactsServices.removeContact(req.params);
    if (contact) {
      res.status(httpCodes.OK).json({
        status: 'success',
        code: httpCodes.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: httpCodes.NOT_FOUND,
        message: 'Contact not found',
        data: 'Not Found',
      });
    }
  } catch (e) {
    next(e);
  }
};

const addContact = (req, res, next) => {
  try {
    const contact = contactsServices.addContact(req.body);
    res.status(httpCodes.CREATED).json({
      status: 'success',
      code: httpCodes.CREATED,
      data: {
        contact,
      },
    });
  } catch (e) {
    next(e);
  }
};

const updateContact = (req, res, next) => {
  if (Object.values(req.body).length === 0) {
    return next({
      status: httpCodes.BAD_REQUEST,
      message: 'Missing fields',
      data: 'Missing fields',
    });
  }

  try {
    const contact = contactsServices.updateContact(req.params, req.body);
    if (contact) {
      res.status(httpCodes.OK).json({
        status: 'success',
        code: httpCodes.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: httpCodes.NOT_FOUND,
        message: 'Contact not found',
        data: 'Not Found',
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};