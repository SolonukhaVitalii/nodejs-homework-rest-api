const express = require('express');
const router = express.Router();
const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateStatus,
} = require('../../validation/contacts');
const contactsController = require('../../controllers/contacts');

router.get('/', contactsController.listContacts);

router.get('/:contactId', contactsController.getContactById);

router.post('/', validateCreateContact, contactsController.addContact);

router.delete('/:contactId', contactsController.removeContact);

router.patch(
  '/:contactId',
  validateUpdateContact,
  contactsController.updateContact,
);

router.patch(
  '/:contactId/favorite',
  validateUpdateStatus,
  contactsController.updateContactStatus,
);

module.exports = router;