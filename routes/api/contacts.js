const express = require('express');
const router = express.Router();

const {
  validateCreateContact,
  validateUpdateContact,
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

module.exports = router;
