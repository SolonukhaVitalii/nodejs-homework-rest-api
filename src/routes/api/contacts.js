const express = require('express');
const router = express.Router();
const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateStatus,
} = require('../../validation/contacts');
const contactsController = require('../../controllers/contacts');
const guard = require('../../helpers/guard');

router.get('/', guard, contactsController.listContacts);

router.get('/:contactId', guard, contactsController.getContactById);

router.post('/', guard, validateCreateContact, contactsController.addContact);

router.delete('/:contactId', guard, contactsController.removeContact);

router.patch(
  '/:contactId',
  guard,
  validateUpdateContact,
  contactsController.updateContact,
);

router.patch(
  '/:contactId/favorite',
  guard,
  validateUpdateStatus,
  contactsController.updateContactStatus,
);

module.exports = router;