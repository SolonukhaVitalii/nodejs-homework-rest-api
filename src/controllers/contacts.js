const { httpCodes } = require('../helpers/code-constans');
const { ContactsServices } = require('../services/contacts');

const contactsServices = new ContactsServices();

const listContacts = async (req, res, next) => {
  try {
    const contacts = await contactsServices.listContacts();
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

const getContactById = async (req, res, next) => {
  try {
    const contact = await contactsServices.getContactById(req.params);
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

const removeContact = async (req, res, next) => {
  try {
    const contact = await contactsServices.removeContact(req.params);
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

const addContact = async (req, res, next) => {
  try {
    const contact = await contactsServices.addContact(req.body);
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

const updateContact = async (req, res, next) => {
  if (Object.values(req.body).length === 0) {
    return next({
      status: httpCodes.BAD_REQUEST,
      message: 'Missing fields',
      data: 'Missing fields',
    });
  }

  try {
    const contact = await contactsServices.updateContact(req.params, req.body);
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

const updateContactStatus = async (req, res, next) => {
  try {
    const contact = await contactsServices.updateContactStatus(
      req.params,
      req.body,
    );
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
  updateContactStatus,
};