const { httpCodes } = require('../helpers/code-constans');
const { ContactsServices } = require('../services/contacts');

const contactsServices = new ContactsServices();

const listContacts = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const { docs, ...rest } = await contactsServices.listContacts(
      userId,
      req.query,
    );

    res.status(httpCodes.OK).json({
      status: 'success',
      code: httpCodes.OK,
      data: {
        contacts: [...docs],
        ...rest,
      },
    });
  } catch (e) {
    next(e);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const contact = await contactsServices.getContactById(userId, req.params);
    console.log(contact);
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
    const userId = req.user.id;

    const contact = await contactsServices.removeContact(userId, req.params);
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
    const userId = req.user.id;
    const contact = await contactsServices.addContact(userId, req.body);
    console.log(userId);
    console.log(contact);
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
    const userId = req.user.id;

    const contact = await contactsServices.updateContact(
      userId,
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

const updateContactStatus = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const contact = await contactsServices.updateContactStatus(
      userId,
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