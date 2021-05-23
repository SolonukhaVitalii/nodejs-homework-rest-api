const express = require('express');
const controllerUsers = require('../../controllers/users');
const router = express.Router();
const {
  validateLoginUser,
  validateRegistrationUser,
  validateSubscriptionUpdate,
  validateVerifyUser,
} = require('../../validation/users');
const guard = require('../../helpers/guard');
const upload = require('../../helpers/multer');

router.get('/current', guard, controllerUsers.current);
router.get('/verify/:verificationToken', controllerUsers.verification);

router.post('/verify', validateVerifyUser, controllerUsers.reVerification);
router.post('/signup', validateRegistrationUser, controllerUsers.registration);
router.post('/login', validateLoginUser, controllerUsers.login);
router.post('/logout', guard, controllerUsers.logout);

router.patch(
  '/',
  guard,
  validateSubscriptionUpdate,
  controllerUsers.updateSubscription,
);
router.patch(
  '/avatars',
  guard,
  upload.single('avatar'),
  controllerUsers.uploadAvatar,
);

module.exports = router;