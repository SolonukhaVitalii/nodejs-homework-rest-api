const express = require('express');
const controllerUsers = require('../../controllers/users');
const router = express.Router();
const {
  validateLoginUser,
  validateRegistrationUser,
  validateSubscriptionUpdate,
} = require('../../validation/users');
const guard = require('../../helpers/guard');

router.patch(
  '/',
  guard,
  validateSubscriptionUpdate,
  controllerUsers.updateSubscription,
);
router.post('/signup', validateRegistrationUser, controllerUsers.registration);
router.post('/login', validateLoginUser, controllerUsers.login);
router.post('/logout', guard, controllerUsers.logout);
router.get('/current', guard, controllerUsers.current);

module.exports = router;